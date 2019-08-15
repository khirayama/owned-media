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

describe('Resource.delete', () => {
  // TODO
});

describe('Resource.createRelations', () => {
  beforeAll(() => {
    Resource.reset();
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

describe('Resource.deleteRelations', () => {
  // TODO
});

describe('Resource.findRelations', () => {
  // TODO
});

describe('Resource.createTargetCountries', () => {
  beforeAll(() => {
    Resource.reset();
    const resource = Resource.create({
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
    Resource.createTargetCountries(resource.id, ['ja_JP', 'en_US']);
  });
  it('Work correctly', () => {
    expect(Resource['records']['resourceTargetCountries'][0].country_code).toEqual('ja_JP');
    expect(Resource['records']['resourceTargetCountries'][1].country_code).toEqual('en_US');
  });
});

describe('Resource.deleteTargetCountries', () => {
  // TODO
});

describe('Resource.findTargetCountries', () => {
  // TODO
});

describe('Resource.createExceptedCountries', () => {
  beforeAll(() => {
    Resource.reset();
    const resource = Resource.create({
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
    Resource.createExceptedCountries(resource.id, ['ja_JP', 'en_US']);
  });
  it('Work correctly', () => {
    expect(Resource['records']['resourceExceptedCountries'][0].country_code).toEqual('ja_JP');
    expect(Resource['records']['resourceExceptedCountries'][1].country_code).toEqual('en_US');
  });
});

describe('Resource.deleteExceptedCountries', () => {});

describe('Resource.findExceptedCountries', () => {});

describe('Resource.removeRecord', () => {});

describe('Resource.find', () => {
  beforeAll(() => {
    Resource.reset();
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

  it('Find all resources.', () => {
    const resources = Resource.find();
    expect(resources).toEqual([
      {
        id: '1',
        key: 'content-1',
        type: 'note',
        contents: { body: 'リソースボディ 1', name: 'リソース名前 1' },
        attributes: { sample: '1' },
        createdAt: resources[0].createdAt,
        updatedAt: resources[0].updatedAt,
      },
      {
        id: '2',
        key: 'content-2',
        type: 'note',
        contents: { body: 'リソースボディ 2', name: 'リソース名前 2' },
        attributes: { sample: '2' },
        createdAt: resources[1].createdAt,
        updatedAt: resources[1].updatedAt,
      },
      {
        id: '3',
        key: 'content-3',
        type: 'note',
        contents: { body: 'リソースボディ 3', name: 'リソース名前 3' },
        attributes: { sample: '3' },
        createdAt: resources[2].createdAt,
        updatedAt: resources[2].updatedAt,
      },
    ]);
  });
  it('Find all resources with locale.', () => {
    const resources = Resource.find(null, { locale: 'en_US' });
    expect(resources).toEqual([
      {
        id: '3',
        key: 'content-3',
        type: 'note',
        contents: { body: 'Resource Body 3', name: 'Resource Name 3' },
        attributes: { sample: '3' },
        createdAt: resources[0].createdAt,
        updatedAt: resources[0].updatedAt,
      },
    ]);
  });
  it('Find all resources with fallbackLocales.', () => {
    const resources = Resource.find(null, { locale: 'en_US', fallbackLocales: ['ja_JP'] });
    expect(resources).toEqual([
      {
        id: '1',
        key: 'content-1',
        type: 'note',
        contents: { body: 'リソースボディ 1', name: 'リソース名前 1' },
        attributes: { sample: '1' },
        createdAt: resources[0].createdAt,
        updatedAt: resources[0].updatedAt,
      },
      {
        id: '2',
        key: 'content-2',
        type: 'note',
        contents: { body: 'リソースボディ 2', name: 'リソース名前 2' },
        attributes: { sample: '2' },
        createdAt: resources[1].createdAt,
        updatedAt: resources[1].updatedAt,
      },
      {
        id: '3',
        key: 'content-3',
        type: 'note',
        contents: { body: 'Resource Body 3', name: 'Resource Name 3' },
        attributes: { sample: '3' },
        createdAt: resources[2].createdAt,
        updatedAt: resources[2].updatedAt,
      },
    ]);
  });
  it('Find resources with id.', () => {
    const resources = Resource.find({ id: '1' });
    expect(resources).toEqual([
      {
        attributes: { sample: '1' },
        contents: { body: 'リソースボディ 1', name: 'リソース名前 1' },
        id: '1',
        key: 'content-1',
        type: 'note',
        createdAt: resources[0].createdAt,
        updatedAt: resources[0].updatedAt,
      },
    ]);
  });
  it('Find resources with ids.', () => {
    const resources = Resource.find({ id: ['1', '2', '3'] });
    expect(resources).toEqual([
      {
        id: '1',
        key: 'content-1',
        type: 'note',
        contents: { body: 'リソースボディ 1', name: 'リソース名前 1' },
        attributes: { sample: '1' },
        createdAt: resources[0].createdAt,
        updatedAt: resources[0].updatedAt,
      },
      {
        id: '2',
        key: 'content-2',
        type: 'note',
        contents: { body: 'リソースボディ 2', name: 'リソース名前 2' },
        attributes: { sample: '2' },
        createdAt: resources[1].createdAt,
        updatedAt: resources[1].updatedAt,
      },
      {
        id: '3',
        key: 'content-3',
        type: 'note',
        contents: { body: 'リソースボディ 3', name: 'リソース名前 3' },
        attributes: { sample: '3' },
        createdAt: resources[2].createdAt,
        updatedAt: resources[2].updatedAt,
      },
    ]);
  });
  it('Find resources with existing locale.', () => {
    const resources = Resource.find({ id: '3' }, { locale: 'en_US' });
    expect(resources).toEqual([
      {
        id: '3',
        key: 'content-3',
        type: 'note',
        contents: { body: 'Resource Body 3', name: 'Resource Name 3' },
        attributes: { sample: '3' },
        createdAt: resources[0].createdAt,
        updatedAt: resources[0].updatedAt,
      },
    ]);
  });
  it('Find resources with not existing locale.', () => {
    const resources = Resource.find({ id: '2' }, { locale: 'en_US' });
    expect(resources).toEqual([]);
  });
  it('Find resources with not existing locale and fallbackLocales.', () => {
    const resources = Resource.find({ id: '2' }, { locale: 'en_US', fallbackLocales: ['ja_JP'] });
    expect(resources).toEqual([
      {
        id: '2',
        key: 'content-2',
        type: 'note',
        contents: { body: 'リソースボディ 2', name: 'リソース名前 2' },
        attributes: { sample: '3' },
        createdAt: resources[0].createdAt,
        updatedAt: resources[0].updatedAt,
      },
    ]);
  });
  it('Find resources with country code.', () => {
    const resourcesForJP = Resource.find(null, { country: 'jp' });
    expect(resourcesForJP).toEqual([
      {
        id: '1',
        key: 'content-1',
        type: 'note',
        contents: { body: 'リソースボディ 1', name: 'リソース名前 1' },
        attributes: { sample: '1' },
        createdAt: resourcesForJP[0].createdAt,
        updatedAt: resourcesForJP[0].updatedAt,
      },
      {
        id: '2',
        key: 'content-2',
        type: 'note',
        contents: { body: 'リソースボディ 2', name: 'リソース名前 2' },
        attributes: { sample: '2' },
        createdAt: resourcesForJP[1].createdAt,
        updatedAt: resourcesForJP[1].updatedAt,
      },
      {
        id: '3',
        key: 'content-3',
        type: 'note',
        contents: { body: 'リソースボディ 3', name: 'リソース名前 3' },
        attributes: { sample: '3' },
        createdAt: resourcesForJP[2].createdAt,
        updatedAt: resourcesForJP[2].updatedAt,
      },
    ]);
    const resourcesForUS = Resource.find(null, { locale: 'en_US', fallbackLocales: ['ja_JP'], country: 'us' });
    expect(resourcesForUS).toEqual([
      {
        id: '3',
        key: 'content-3',
        type: 'note',
        contents: { body: 'Resource Body 3', name: 'Resource Name 3' },
        attributes: { sample: '3' },
        createdAt: resourcesForUS[0].createdAt,
        updatedAt: resourcesForUS[0].updatedAt,
      },
    ]);
    const resourcesForFR = Resource.find(null, { locale: 'en_US', fallbackLocales: ['ja_JP'], country: 'fr' });
    expect(resourcesForFR).toEqual([
      {
        id: '2',
        key: 'content-2',
        type: 'note',
        contents: { body: 'リソースボディ 2', name: 'リソース名前 2' },
        attributes: { sample: '2' },
        createdAt: resourcesForFR[0].createdAt,
        updatedAt: resourcesForFR[0].updatedAt,
      },
      {
        id: '3',
        key: 'content-3',
        type: 'note',
        contents: { body: 'Resource Body 3', name: 'Resource Name 3' },
        attributes: { sample: '3' },
        createdAt: resourcesForFR[1].createdAt,
        updatedAt: resourcesForFR[1].updatedAt,
      },
    ]);
  });
});
