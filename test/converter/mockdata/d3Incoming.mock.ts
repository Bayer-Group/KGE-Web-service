import { D3Result } from "../../../src/services/models/d3Result.model";

export const d3Incoming: D3Result = {
    nodes: [
      {
        uri: 'https://pid.bayer.com/70107/001/1/SubstanceCombination_13057',
        data: {mainLabel: "Unlabelled Node"}
      }
    ],
    links: [
      {
        prettyLabel: 'Test',
        label: 'http://10.122.106.18:3000/Test',
        source: 'https://pid.bayer.com/70107/001/1/SubstanceCombination_13057',
        target: 'http://pid.bayer.com/kos/19014/1/ggvcm'
      }
    ]
  }