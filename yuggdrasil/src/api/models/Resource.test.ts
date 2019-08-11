import { Resource } from './Resource';

Resource.init();

describe('Resource.create', () => {
  beforeEach(() => {
    Resource.reset();
  });

  it('Create resource without locale', () => {
    const resource = Resource.create({
      type: 'note',
      key: 'first-content',
      contents: {
        name: 'リソース名前',
        body: 'リソースボディ',
      },
      attributes: {
        sample: '1',
      },
    });
    expect(resource).toEqual({
      id: '1',
      type: 'note',
      key: 'first-content',
      contents: {
        name: 'リソース名前',
        body: 'リソースボディ',
      },
      attributes: {
        sample: '1',
      },
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    });
    expect(Resource['records']['resourceContents'][0].locale).toEqual('ja_JP');
    expect(Resource['records']['resourceContents'][1].locale).toEqual('ja_JP');
  });
  it('Create resource with locale', () => {
    const resource = Resource.create(
      {
        type: 'note',
        key: 'first-content',
        contents: {
          name: 'Resource Name',
          body: 'Resource Body',
        },
        attributes: {
          sample: '1',
        },
      },
      { locale: 'en_US' },
    );
    expect(resource).toEqual({
      id: '1',
      type: 'note',
      key: 'first-content',
      contents: {
        name: 'Resource Name',
        body: 'Resource Body',
      },
      attributes: {
        sample: '1',
      },
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    });
    expect(Resource['records']['resourceContents'][0].locale).toEqual('en_US');
    expect(Resource['records']['resourceContents'][1].locale).toEqual('en_US');
  });
});
