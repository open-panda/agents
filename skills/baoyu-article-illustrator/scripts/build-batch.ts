import path from "node:path";
import process from "node:process";
import { readdir, readFile, writeFile } from "node:fs/promises";

type CliArgs = {
  outlinePath: string | null;
  promptsDir: string | null;
  outputPath: string | null;
  imagesDir: string | null;
  provider: string;
  model: string;
  aspectRatio: string;
  quality: string;
  jobs: number | null;
  help: boolean;
};

type OutlineEntry = {
  index: number;
  filename: string;
};

function printUsage(): void {
  console.log(`Usage:
  npx -y tsx scripts/build-batch.ts --outline outline.md --prompts prompts --output batch.json --images-dir attachments

Options:
  --outline <path>     Path to outline.md
  --prompts <path>     Path to prompts directory
  --output <path>      Path to output batch.json
  --images-dir <path>  Directory for generated images
  --provider <name>    Provider for baoyu-imagine batch tasks (default: replicate)
  --model <id>         Model for baoyu-imagine batch tasks (default: google/nano-banana-pro)
  --ar <ratio>         Aspect ratio for all tasks (default: 16:9)
  --quality <level>    Quality for all tasks (default: 2k)
  --jobs <count>       Recommended worker count metadata (optional)
  -h, --help           Show help`);
}

function parseArgs(argv: string[]): CliArgs {
  const args: CliArgs = {
    outlinePath: null,
    promptsDir: null,
    outputPath: null,
    imagesDir: null,
    provider: "replicate",
    model: "google/nano-banana-pro",
    aspectRatio: "16:9",
    quality: "2k",
    jobs: null,
    help: false,
  };

  for (let i = 0; i < argv.length; i++) {
    const current = argv[i]!;
    if (current === "--outline") args.outlinePath = argv[++i] ?? null;
    else if (current === "--prompts") args.promptsDir = argv[++i] ?? null;
    else if (current === "--output") args.outputPath = argv[++i] ?? null;
    else if (current === "--images-dir") args.imagesDir = argv[++i] ?? null;
    else if (current === "--provider") args.provider = argv[++i] ?? args.provider;
    else if (current === "--model") args.model = argv[++i] ?? args.model;
    else if (current === "--ar") args.aspectRatio = argv[++i] ?? args.aspectRatio;
    else if (current === "--quality") args.quality = argv[++i] ?? args.quality;
    else if (current === "--jobs") {
      const value = argv[++i];
      args.jobs = value ? parseInt(value, 10) : null;
    } else if (current === "--help" || current === "-h") {
      args.help = true;
    }
  }
  return args;
}

function parseOutline(content: string): OutlineEntry[] {
  const entries: OutlineEntry[] = [];
  const blocks = content.split(/^## Illustration\s+/m).slice(1);

  for (const block of blocks) {
    const indexMatch = block.match(/^(\d+)/);
    const filenameMatch = block.match(/\*\*Filename\*\*:\s*(.+)/);
    if (indexMatch && filenameMatch) {
      entries.push({
        index: parseInt(indexMatch[1]!, 10),
        filename: filenameMatch[1]!.trim(),
      });
    }
  }
  return entries;
}

async function findPromptFile(promptsDir: string, entry: OutlineEntry): Promise<string | null> {
  const files = await readdir(promptsDir);
  const prefix = String(entry.index).padStart(2, "0");
  const match = files.find((f) => f.startsWith(prefix) && f.endsWith(".md"));
  return match ? path.join(promptsDir, match) : null;
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printUsage();
    return;
  }

  if (!args.outlinePath) {
    console.error("Error: --outline is required");
    process.exit(1);
  }
  if (!args.promptsDir) {
    console.error("Error: --prompts is required");
    process.exit(1);
  }
  if (!args.outputPath) {
    console.error("Error: --output is required");
    process.exit(1);
  }

  const outlineContent = await readFile(args.outlinePath, "utf8");
  const entries = parseOutline(outlineContent);

  if (entries.length === 0) {
    console.error("No illustration entries found in outline.");
    process.exit(1);
  }

  const tasks = [];
  for (const entry of entries) {
    const promptFile = await findPromptFile(args.promptsDir, entry);
    if (!promptFile) {
      console.error(`Warning: No prompt file found for illustration ${entry.index}, skipping.`);
      continue;
    }

    const imageDir = args.imagesDir ?? path.dirname(args.outputPath);
    tasks.push({
      id: `illustration-${String(entry.index).padStart(2, "0")}`,
      promptFiles: [promptFile],
      image: path.join(imageDir, entry.filename),
      provider: args.provider,
      model: args.model,
      ar: args.aspectRatio,
      quality: args.quality,
    });
  }

  const output: Record<string, unknown> = { tasks };
  if (args.jobs) output.jobs = args.jobs;

  await writeFile(args.outputPath, JSON.stringify(output, null, 2) + "\n");
  console.log(`Batch file written: ${args.outputPath} (${tasks.length} tasks)`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
