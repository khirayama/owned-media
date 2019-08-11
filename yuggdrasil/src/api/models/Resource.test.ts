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
