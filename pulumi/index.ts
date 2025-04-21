import * as pulumi from "@pulumi/pulumi";

import * as vultr from "@ediri/vultr";

const activeInstances = vultr.getInstances({
    filters: [{
        name: "status",
        values: ["active"],
    }],
})