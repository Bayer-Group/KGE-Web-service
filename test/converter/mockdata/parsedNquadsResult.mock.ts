import { TripleModel } from "../../../src/services/models/triples.model";

export const parsedNquadsResult: TripleModel[] = [
    {
      s: 'http://test/test/123',
      p: 'http://test/123/123',
      o: 'http://test/1235/123'
    },
    {
      s: 'http://test/test/123',
      p: 'http://test/123/123',
      o: 'http://test/1235/123'
    },
    {
      s: 'http://test/test/123',
      p: 'http://test/123/123',
      o: 'http://test/1235/123'
    },
    {
      s: 'http://test/test/123',
      p: 'http://test/123/123',
      o: 'http://test/1235/123'
    },
    {
      s: 'http://test/test/123',
      p: 'http://test/123/123',
      o: 'http://test/1235/123'
    },
    {
      s: 'http://test/test/123',
      p: 'http://test/123/123',
      o: 'http://test/1235/123'
    },
    {
      s: 'http://test/test/123',
      p: 'http://test/123/123',
      o: 'http://test/1235/123'
    }
  ];

  export const parsedNquadsSpecialCharacterResult: TripleModel[] = [
    {
      s: 'http://pid.bayer.com/kos/19014/1/ggvcm',
      p: 'http://10.122.106.18:3000/offers',
      o: 'ǅenan ǅafić'
    },
    {
      s: 'http://pid.bayer.com/kos/19014/1/ggvcm',
      p: 'ǅenan ǅafić',
      o: 'http://10.122.106.18:3000/offers'
    },
    {
      s: 'ǅenan ǅafić',
      p: 'http://pid.bayer.com/kos/19014/1/ggvcm',
      o: 'http://10.122.106.18:3000/offers'
    },
    {
      s: 'http://pid.bayer.com/kos/19014/1/ggvcm',
      p: 'http://10.122.106.18:3000/offers',
      o: 'Geräteüberhöhung'
    },
    {
      s: 'http://pid.bayer.com/kos/19014/1/ggvcm',
      p: 'http://10.122.106.18:3000/offers',
      o: 'le tréma'
    },
  ];

export default parsedNquadsResult;