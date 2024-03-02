import * as core from "@actions/core";
import * as os from "node:os";
import * as fs from "node:fs";
import * as path from "node:path";

const content = `#!/bin/sh
echo Hello, world!
`

async function run() {
  try {
    const root = await fs.promises.mkdtemp(path.join(os.tmpdir(), "action-"));
    const bin = path.join(root, "my-bin");
    await fs.promises.writeFile(bin, content, { mode: 0o755 })

    core.info("Created at " + bin);

    core.addPath(bin)

  } catch (error) {
    console.error(error);
    core.setFailed(error.message);
  }
}

run();
