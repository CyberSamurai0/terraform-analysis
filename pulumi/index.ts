import * as pulumi from "@pulumi/pulumi";

import * as vultr from "@ediri/vultr";

let v = vultr.getBareMetalServer({
    filters: [{
        name: "label",
        values: ["samurai01"]
    }],
}).then((server) => {
    console.log(server);
}).catch((err) => {
    console.error(err);
});