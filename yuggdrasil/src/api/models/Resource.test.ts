import { Resource } from './Resource';

Resource.init();

afterAll(() => {
  Resource.reset();
});

describe('Resource.create', () => {
  beforeEach(() => {
    Resource.reset();
  });

  it('Create resource without locale.', () => {
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
    if (resource) {
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
    }
    expect(Resource['records']['resourceContents'][0].locale).toEqual('ja_JP');
    expect(Resource['records']['resourceContents'][1].locale).toEqual('ja_JP');
  });

  it('Create resource with locale.', () => {
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
    if (resource) {
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
    }
    expect(Resource['records']['resourceContents'][0].locale).toEqual('en_US');
    expect(Resource['records']['resourceContents'][1].locale).toEqual('en_US');
  });

  it('Create resource with existing key in same locale.', () => {
    Resource.create({
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
    expect(() => {
      Resource.create({
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
    }).toThrow();
  });

  it('Create resource with existing key in other locale.', () => {
    Resource.create({
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
    expect(() => {
      Resource.create(
        {
          type: 'note',
          key: 'first-content',
          contents: {
            name: 'リソース名前',
            body: 'リソースボディ',
          },
          attributes: {
            sample: '1',
          },
        },
        { locale: 'en_US' },
      );
    }).toThrow();
  });

  it('Create resource with id.', () => {
    expect(() => {
      Resource.create({
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
      });
    }).toThrow();
  });
});

describe('Resource.update', () => {
  beforeEach(() => {
    Resource.reset();
    Resource.create({
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
  });

  it('Update fileds without locale.', () => {
    const resource = Resource.update('1', {
      key: 'updated-first-content',
      contents: {
        name: 'リソース名前 2',
        body: 'リソースボディ 2',
      },
      attributes: {
        sample: '2',
        sample2: '2',
      },
    });
    expect(resource).toEqual({
      id: '1',
      type: 'note',
      key: 'updated-first-content',
      contents: {
        name: 'リソース名前 2',
        body: 'リソースボディ 2',
      },
      attributes: {
        sample: '2',
        sample2: '2',
      },
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    });
  });

  it('Update fileds with locale not existing resource on the locale.', () => {
    const resource = Resource.update(
      '1',
      {
        key: 'updated-first-content',
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
      key: 'updated-first-content',
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
    expect(Resource.find({ id: resource.id })[0]).toEqual({
      id: '1',
      type: 'note',
      key: 'updated-first-content',
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
  });

  it('Remove fields.', () => {
    const resource = Resource.update('1', {
      contents: {
        name: null,
      },
      attributes: {
        sample: null,
      },
    });
    expect(resource).toEqual({
      id: '1',
      type: 'note',
      key: 'first-content',
      contents: {
        body: 'リソースボディ',
      },
      attributes: {},
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
    });
  });
});

describe('Resource.delete', () => {});

describe('Resource.createRelations', () => {
  beforeAll(() => {
    const resource1 = Resource.create({
      type: 'note',
      key: 'content-1',
      contents: {
        name: 'リソース名前 1',
        body: 'リソースボディ 1',
      },
      attributes: {
        sample: '1',
      },
    });
    const resource2 = Resource.create({
      type: 'note',
      key: 'content-2',
      contents: {
        name: 'リソース名前 2',
        body: 'リソースボディ 2',
      },
      attributes: {
        sample: '2',
      },
    });
    const resource3 = Resource.create({
      type: 'note',
      key: 'content-3',
      contents: {
        name: 'リソース名前 3',
        body: 'リソースボディ 3',
      },
      attributes: {
        sample: '3',
      },
    });
    Resource.createRelations(resource1.id, [resource2.id, resource3.id]);
    expect(Resource['records']['resourceRelations'][0].resource1_id).toEqual(resource1.id);
    expect(Resource['records']['resourceRelations'][0].resource2_id).toEqual(resource2.id);
    expect(Resource['records']['resourceRelations'][1].resource1_id).toEqual(resource1.id);
    expect(Resource['records']['resourceRelations'][1].resource2_id).toEqual(resource3.id);
  });
});

describe('Resource.deleteRelations', () => {});

describe('Resource.findRelations', () => {});

describe('Resource.createTargetCountries', () => {});

describe('Resource.deleteTargetCountries', () => {});

describe('Resource.findTargetCountries', () => {});

describe('Resource.createExceptedCountries', () => {});

describe('Resource.deleteExceptedCountries', () => {});

describe('Resource.findExceptedCountries', () => {});

describe('Resource.removeRecord', () => {});

describe('Resource.find', () => {
  beforeAll(() => {
    const resource1 = Resource.create({
      type: 'note',
      key: 'content-1',
      contents: {
        name: 'リソース名前 1',
        body: 'リソースボディ 1',
      },
      attributes: {
        sample: '1',
      },
    });
    const resource2 = Resource.create({
      type: 'note',
      key: 'content-2',
      contents: {
        name: 'リソース名前 2',
        body: 'リソースボディ 2',
      },
      attributes: {
        sample: '2',
      },
    });
    const resource3 = Resource.create({
      type: 'note',
      key: 'content-3',
      contents: {
        name: 'リソース名前 3',
        body: 'リソースボディ 3',
      },
      attributes: {
        sample: '3',
      },
    });
    Resource.update(
      resource3.id,
      {
        key: 'content-3',
        contents: {
          name: 'Resource Name 3',
          body: 'Resource Body 3',
        },
        attributes: {
          sample: '3',
        },
      },
      { locale: 'en_US' },
    );
    Resource.createRelations(resource1.id, [resource2.id, resource3.id]);
    Resource.createTargetCountries(resource1.id, ['jp']);
    Resource.createExceptedCountries(resource2.id, ['us']);
  });

  afterAll(() => {
    Resource.reset();
  });

  it('Find resources with string.', () => {});
  it('Find resources with strings.', () => {});
  it('Find resources with existing locale.', () => {});
  it('Find resources with not existing locale.', () => {});
  it('Find resources having multi locale.', () => {});
  it('Find resources with country code.', () => {});
});
