import * as pulumi from "@pulumi/pulumi";
import * as vultr from "@ediri/vultr";
import * as fs from "fs";
import * as path from "path";

const scriptPath = path.join(__dirname, "provision.sh");
const scriptContent = fs.readFileSync(scriptPath, "utf-8");

const ProvisionScript = new vultr.StartupScript("ProvisionScript", {
    name: "Pulumi Demo Provisioning",
    script: Buffer.from(scriptContent).toString("base64"),
    type: "boot"
});

let Ubuntu: string | undefined = undefined;
vultr.getOs({
    filters: [{
        name: "name",
        values: ["Ubuntu 22.04 x64"]
    }],
}).then(os => {
    Ubuntu = os.id;
});

export const instance = new vultr.Instance("pulumi-instance", {
    // Region: Seattle, Washington
    region: "sea",

    // Instance type: 1 vCPU, 1 GB RAM, 25 GB SSD, $5.00month ($0.007/hour)
    plan: "vc2-1c-1gb",

    // Ubuntu 22.04 x64
    osId: Ubuntu,

    // Configure Hostname
    hostname: "pulumi-instance",

    // Configure Label (Display Name)
    label: "pulumi-instance",

    // Disable Automatic Backups
    backups: "disabled",

    // Disable DDOS Protection
    ddosProtection: false,

    // Disable IPv6
    enableIpv6: false,

    // Startup Script ID
    scriptId: ProvisionScript.id,

    // Define Tags for the Instance
    tags: ["pulumi"],
});
