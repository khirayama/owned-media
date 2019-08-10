import { Resource } from './Resource';

Resource.init();

test('Create resource without locale', () => {
  const resource = Resource.create({
    type: 'note',
    // TODO: keyでひける時はUPDATEだ
    key: 'first-content',
    contents: {
      name: 'Content Name',
      body: 'Content Body',
    },
    attributes: {
      sample: '1',
    },
  });
  console.log(resource);
  console.log(Resource.find());
  Resource.reset();
  console.log(Resource.find());
});
