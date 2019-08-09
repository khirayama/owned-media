/* eslint-disable @typescript-eslint/camelcase */
import * as path from 'path';

import * as fsExtra from 'fs-extra';

import { Config, ResourceShape } from '../types';
import { loadConfig, csvStringify, csvParse } from '../utils';

const config: Config = loadConfig();

const ROOT_PATH = process.cwd();
const DATA_PATH = path.join(ROOT_PATH, 'data');

type ResourceRecord = {
  id: string;
  type: string;
  key: string;
  created_at: string;
  updated_at: string;
};

type ResourceContentRecord = {
  id: string;
  resource_id: string;
  locale: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
};

type ResourceAttributeRecord = {
  id: string;
  resource_id: string;
  key: string;
  value: string;
  created_at: string;
  updated_at: string;
};

type ResourceRelationRecord = {
  id: string;
  resource1_id: string;
  resource2_id: string;
  created_at: string;
  updated_at: string;
};

type ResourceTargetCountryRecord = {
  id: string;
  resource_id: string;
  country_code: string;
  created_at: string;
  updated_at: string;
};

type ResourceExceptedCountryRecord = {
  id: string;
  resource_id: string;
  country_code: string;
  created_at: string;
  updated_at: string;
};

type Resources = {
  [resourceId: string]: {
    [locale: string]: ResourceShape;
  };
};

type FindCondition = {
  id?: string | string[];
  type?: string | string[];
  key?: string | string[];
};

/*
- Resource.defaultLocale
- Resource.columns
  - Resource.columns.resources
  - Resource.columns.resourceContents
  - Resource.columns.resourceAttributes
  - Resource.columns.resourceRelations
  - Resource.columns.resourceTargetContries
  - Resource.columns.resourceExceptedContries
- Resource.filePaths
  - Resource.filePaths.resources
  - Resource.filePaths.resourceContents
  - Resource.filePaths.resourceAttributes
  - Resource.filePaths.resourceRelations
  - Resource.filePaths.resourceTargetContries
  - Resource.filePaths.resourceExceptedContries
- Resource.records
  - Resource.records.resources
  - Resource.records.resourceContents
  - Resource.records.resourceAttributes
  - Resource.records.resourceRelations
  - Resource.records.resourceTargetContries
  - Resource.records.resourceExceptedContries
- Resource.resources
- Resource.init()
- Resource.load()
- Resource.buildResources()
- Resource.find()
- Resource.relation()
- Resource.create()
- Resource.update()
- Resource.delete()
- Resource.createRelations()
- Resource.deleteRelations()
- Resource.findTargetCountries()
- Resource.createTargetCountries()
- Resource.deleteTargetCountries()
- Resource.findExceptedCountries()
- Resource.createExceptedCountries()
- Resource.deleteExceptedCountries()
- Resource.save()
*/
export class Resource {
  public static defaultLocale: string = config.locales[0];

  private static columns = {
    resources: ['id', 'type', 'key', 'created_at', 'updated_at'],
    resourceContents: ['id', 'resource_id', 'locale', 'key', 'value', 'created_at', 'updated_at'],
    resourceAttributes: ['id', 'resource_id', 'key', 'value', 'created_at', 'updated_at'],
    resourceRelations: ['id', 'resource1_id', 'resource2_id', 'created_at', 'updated_at'],
    resourceTargetCountries: ['id', 'resource_id', 'country_code', 'created_at', 'updated_at'],
    resourceExceptedCountries: ['id', 'resource_id', 'country_code', 'created_at', 'updated_at'],
  };

  private static filePaths = {
    resources: path.join(DATA_PATH, 'resources.csv'),
    resourceContents: path.join(DATA_PATH, 'resource_contents.csv'),
    resourceAttributes: path.join(DATA_PATH, 'resource_attributes.csv'),
    resourceRelations: path.join(DATA_PATH, 'resource_relations.csv'),
    resourceTargetCountries: path.join(DATA_PATH, 'resource_target_countries.csv'),
    resourceExceptedCountries: path.join(DATA_PATH, 'resource_excepted_countries.csv'),
  };

  private static records: {
    resources: ResourceRecord[];
    resourceContents: ResourceContentRecord[];
    resourceAttributes: ResourceAttributeRecord[];
    resourceRelations: ResourceRelationRecord[];
    resourceTargetCountries: ResourceTargetCountryRecord[];
    resourceExceptedCountries: ResourceExceptedCountryRecord[];
  } = {
    resources: [],
    resourceContents: [],
    resourceAttributes: [],
    resourceRelations: [],
    resourceTargetCountries: [],
    resourceExceptedCountries: [],
  };

  private static resources: Resources = {};

  public static init() {
    this.load();
    this.resources = this.buildResources(
      this.records.resources,
      this.records.resourceContents,
      this.records.resourceAttributes,
    );
  }

  private static load() {
    try {
      const resourcesCSV = fsExtra.readFileSync(this.filePaths.resources, 'utf8');
      const resourceContentsCSV = fsExtra.readFileSync(this.filePaths.resourceContents, 'utf8');
      const resourceAttributesCSV = fsExtra.readFileSync(this.filePaths.resourceAttributes, 'utf8');
      const resourceRelationsCSV = fsExtra.readFileSync(this.filePaths.resourceRelations, 'utf8');
      const resourceTargetCountriesCSV = fsExtra.readFileSync(this.filePaths.resourceTargetCountries, 'utf8');
      const resourceExceptedCountriesCSV = fsExtra.readFileSync(this.filePaths.resourceExceptedCountries, 'utf8');

      // TODO: Support .md for resource.contents

      this.records = {
        resources: csvParse(resourcesCSV),
        resourceContents: csvParse(resourceContentsCSV),
        resourceAttributes: csvParse(resourceAttributesCSV),
        resourceRelations: csvParse(resourceRelationsCSV),
        resourceTargetCountries: csvParse(resourceTargetCountriesCSV),
        resourceExceptedCountries: csvParse(resourceExceptedCountriesCSV),
      };
    } catch (e) {
      // noop
    }
  }

  private static buildResources(
    resourceRecords: ResourceRecord[],
    resourceContentRecords: ResourceContentRecord[],
    resourceAttributeRecords: ResourceAttributeRecord[],
  ): Resources {
    const resources: Resources = {};

    for (const resourceRecord of resourceRecords) {
      for (const locale of config.locales) {
        const resource: ResourceShape = {
          id: resourceRecord.id,
          type: resourceRecord.type,
          key: resourceRecord.key,
          contents: {},
          attributes: {},
          createdAt: resourceRecord.created_at,
          updatedAt: resourceRecord.updated_at,
        };

        for (const resourceContentRecord of resourceContentRecords) {
          if (resourceContentRecord.resource_id === resourceRecord.id && resourceContentRecord.locale === locale) {
            for (let key of this.columns.resourceAttributes) {
              const whiteList = ['id', 'resource_id', 'created_at', 'updated_at'];

              if (whiteList.indexOf(key) === -1) {
                resource.contents[resourceContentRecord.key] = resourceContentRecord.value;
              }
            }
          }
        }

        for (const resourceAttributeRecord of resourceAttributeRecords) {
          if (resourceAttributeRecord.resource_id === resourceRecord.id) {
            for (let key of this.columns.resourceAttributes) {
              const whiteList = ['id', 'resource_id', 'created_at', 'updated_at'];

              if (whiteList.indexOf(key) === -1) {
                resource.attributes[resourceAttributeRecord.key] = resourceAttributeRecord.value;
              }
            }
          }
        }

        if (resources[resource.id]) {
          resources[resource.id][locale] = resource;
        } else {
          resources[resource.id] = { [locale]: resource };
        }
      }
    }

    return resources;
  }

  public static find(
    conditions?: FindCondition | null,
    options?: { country?: string; locale?: string; limit?: number; offset?: number; sort?: string },
  ): ResourceShape[] {
    let resourceIds = Object.keys(this.resources);

    if (conditions) {
      const targetKeys = Object.keys(conditions);
      for (let targetKey of targetKeys) {
        if (conditions[targetKey]) {
          if (typeof conditions[targetKey] === 'string') {
            resourceIds = resourceIds.filter(
              (resourceId: string) => this.resources[resourceId][targetKey] === conditions[targetKey],
            );
          } else if (Array.isArray(conditions[targetKey])) {
            resourceIds = resourceIds.filter(
              (resourceId: string) => conditions[targetKey].indexOf(this.resources[resourceId][targetKey]) !== -1,
            );
          }
        }
      }
    }

    // options
    // const country: string | null = options.country || null;
    const locale: string = options && options.locale ? options.locale || this.defaultLocale : this.defaultLocale;
    const limit: number | null = options && options.limit ? options.limit : null;
    const offset: number = options && options.offset ? options.offset : 0;
    // const sort: string = 'created_at' || '-created_at';

    if (limit) {
      resourceIds = resourceIds.slice(offset, limit);
    }

    return resourceIds.map((resourceId: string) => this.resources[resourceId][locale] || null).filter(r => !!r);
  }

  public static relation(resourceIds: string[]): string[] {
    const relatedResourceIds: string[] = [];

    for (let resourceRelationRecord of this.records.resourceRelations) {
      if (resourceIds.indexOf(resourceRelationRecord.resource1_id) !== -1) {
        relatedResourceIds.push(resourceRelationRecord.resource2_id);
      } else if (resourceIds.indexOf(resourceRelationRecord.resource2_id) !== -1) {
        relatedResourceIds.push(resourceRelationRecord.resource1_id);
      }
    }

    return relatedResourceIds;
  }

  public static create(resource: Partial<ResourceShape>, options?: { locale: string }) {
    const locale = options ? options.locale || this.defaultLocale : this.defaultLocale;

    const now = new Date();
    const lastResourceRecord = this.records.resources[this.records.resources.length - 1];
    const resourceId: string = lastResourceRecord ? String(Number(lastResourceRecord.id) + 1) : '1';

    // For resources
    const resourceType = resource.type || config.resourceTypes[0].type;
    const resourceKey = resource.key || '';
    this.records.resources.push({
      id: resourceId,
      type: resourceType,
      key: resourceKey,
      created_at: now.toString(),
      updated_at: now.toString(),
    });
    // For resource_contents
    if (resource.contents) {
      for (let key of Object.keys(resource.contents)) {
        const lastResourceContentRecord = this.records.resourceContents[this.records.resourceContents.length - 1];
        const resourceContentId = lastResourceContentRecord ? String(Number(lastResourceContentRecord.id) + 1) : '1';
        this.records.resourceContents.push({
          id: resourceContentId,
          resource_id: resourceId,
          locale,
          key,
          value: resource.contents[key],
          created_at: now.toString(),
          updated_at: now.toString(),
        });
      }
    }
    // For resource_attributes
    if (resource.attributes) {
      for (let key of Object.keys(resource.attributes)) {
        const lastResourceAttributeRecord = this.records.resourceAttributes[this.records.resourceAttributes.length - 1];
        const resourceAttributeId = lastResourceAttributeRecord
          ? String(Number(lastResourceAttributeRecord.id) + 1)
          : '1';
        this.records.resourceAttributes.push({
          id: resourceAttributeId,
          resource_id: resourceId,
          key,
          value: resource.attributes[key],
          created_at: now.toString(),
          updated_at: now.toString(),
        });
      }
    }

    this.save();
    this.resources = this.buildResources(
      this.records.resources,
      this.records.resourceContents,
      this.records.resourceAttributes,
    );

    return this.find({ id: [resourceId] }, { locale })[0];
  }

  public static update(resourceId: string, resource: Partial<ResourceShape>, options?: { locale?: string }) {
    const locale = options ? options.locale || this.defaultLocale : this.defaultLocale;
    const now = new Date();

    const resourceRecord = this.records.resources.filter(resourceRecord => resourceRecord.id === resourceId)[0];
    const resourceContentRecords = this.records.resourceContents.filter(
      resourceContentRecord =>
        resourceContentRecord.resource_id === resourceId && resourceContentRecord.locale === locale,
    );
    const resourceAttributeRecords = this.records.resourceAttributes.filter(
      resourceAttributeRecord => resourceAttributeRecord.resource_id === resourceId,
    );

    // For resources
    if (resource.type !== undefined) {
      resourceRecord.type = resource.type;
      resourceRecord.updated_at = now.toString();
    }
    if (resource.key !== undefined) {
      resourceRecord.key = resource.key;
      resourceRecord.updated_at = now.toString();
    }
    // For resource_contents
    if (resource.contents) {
      for (let key of Object.keys(resource.contents)) {
        let isExisting = false;
        for (let resourceContentRecord of resourceContentRecords) {
          if (resourceContentRecord.key === key && resourceContentRecord.locale === locale) {
            resourceContentRecord.value = resource.contents[key];
            resourceContentRecord.updated_at = now.toString();
            isExisting = true;
          }
        }
        if (!isExisting) {
          const lastResourceContentRecord = this.records.resourceContents[this.records.resourceContents.length - 1];
          const resourceAttributeId = lastResourceContentRecord
            ? String(Number(lastResourceContentRecord.id) + 1)
            : '1';
          this.records.resourceContents.push({
            id: resourceAttributeId,
            resource_id: resourceId,
            locale,
            key,
            value: resource.contents[key],
            created_at: now.toString(),
            updated_at: now.toString(),
          });
        }
      }
    }
    // For resource_attributes
    if (resource.attributes) {
      for (let key of Object.keys(resource.attributes)) {
        let isExisting = false;
        for (let resourceAttributeRecord of resourceAttributeRecords) {
          if (resourceAttributeRecord.key === key) {
            resourceAttributeRecord.value = resource.attributes[key];
            resourceAttributeRecord.updated_at = now.toString();
            isExisting = true;
          }
        }
        if (!isExisting) {
          const lastResourceAttributeRecord = this.records.resourceAttributes[
            this.records.resourceAttributes.length - 1
          ];
          const resourceAttributeId = lastResourceAttributeRecord
            ? String(Number(lastResourceAttributeRecord.id) + 1)
            : '1';
          this.records.resourceAttributes.push({
            id: resourceAttributeId,
            resource_id: resourceId,
            key,
            value: resource.attributes[key],
            created_at: now.toString(),
            updated_at: now.toString(),
          });
        }
      }
    }

    this.save();
    this.resources = this.buildResources(
      this.records.resources,
      this.records.resourceContents,
      this.records.resourceAttributes,
    );

    return this.find({ id: [resourceId] }, { locale })[0];
  }

  public static delete(resourceId: string): void {
    this.records.resources = this.records.resources.filter(record => record.id !== resourceId);
    this.records.resourceContents = this.records.resourceContents.filter(record => record.resource_id !== resourceId);
    this.records.resourceAttributes = this.records.resourceAttributes.filter(
      record => record.resource_id !== resourceId,
    );
    this.records.resourceRelations = this.records.resourceRelations.filter(
      record => record.resource1_id !== resourceId && record.resource2_id !== resourceId,
    );
    this.records.resourceTargetCountries = this.records.resourceTargetCountries.filter(
      record => record.resource_id !== resourceId,
    );
    this.records.resourceExceptedCountries = this.records.resourceExceptedCountries.filter(
      record => record.resource_id !== resourceId,
    );

    this.save();
    this.resources = this.buildResources(
      this.records.resources,
      this.records.resourceContents,
      this.records.resourceAttributes,
    );
  }

  public static createRelations(resourceId: string, relatedResourceIds: string[]) {
    const now = new Date();
    for (let i = 0; i < relatedResourceIds.length; i += 1) {
      const lastRelationRecord = this.records.resourceRelations[this.records.resourceRelations.length - 1];
      const relationId = lastRelationRecord ? String(Number(lastRelationRecord.id) + 1) : '1';
      const relatedResourceId = relatedResourceIds[i];

      if (resourceId === relatedResourceId) {
        continue;
      }

      let isExisting = false;

      for (let j = 0; j < this.records.resourceRelations.length; j += 1) {
        const record = this.records.resourceRelations[j];
        if (
          (record.resource1_id === resourceId && record.resource2_id === relatedResourceId) ||
          (record.resource1_id === relatedResourceId && record.resource2_id === resourceId)
        ) {
          isExisting = true;
          record.updated_at = now.toString();
        }
      }

      if (!isExisting) {
        this.records.resourceRelations.push({
          id: relationId,
          resource1_id: resourceId,
          resource2_id: relatedResourceId,
          created_at: now.toString(),
          updated_at: now.toString(),
        });
      }
    }

    this.save();
  }

  public static deleteRelations(resourceId: string, relatedResourceIds: string[]) {
    for (let i = 0; i < relatedResourceIds.length; i += 1) {
      const relatedResourceId = relatedResourceIds[i];

      if (resourceId === relatedResourceId) {
        continue;
      }

      for (let j = 0; j < this.records.resourceRelations.length; j += 1) {
        const record = this.records.resourceRelations[j];
        if (
          (record.resource1_id === resourceId && record.resource2_id === relatedResourceId) ||
          (record.resource1_id === relatedResourceId && record.resource2_id === resourceId)
        ) {
          this.records.resourceRelations.splice(j, 1);
        }
      }
    }

    this.save();
  }

  public static findTargetCountries(resourceId: string): string[] {
    const countryCodes: string[] = [];
    for (const resourceTargetCountryRecord of this.records.resourceTargetCountries) {
      if (resourceTargetCountryRecord.resource_id === resourceId) {
        countryCodes.push(resourceTargetCountryRecord.country_code);
      }
    }
    return countryCodes;
  }

  public static createTargetCountries(resourceId: string, countryCodes: string[]) {
    const now = new Date();
    for (let i = 0; i < countryCodes.length; i += 1) {
      const countryCode = countryCodes[i];
      const lastTargetCountryRecord = this.records.resourceTargetCountries[
        this.records.resourceTargetCountries.length - 1
      ];
      const targetCountryId = lastTargetCountryRecord ? String(Number(lastTargetCountryRecord.id) + 1) : '1';

      let isExisting = false;

      for (let j = 0; j < this.records.resourceTargetCountries.length; j += 1) {
        const record = this.records.resourceTargetCountries[j];
        if (record.country_code === countryCode) {
          isExisting = true;
          record.updated_at = now.toString();
        }
      }

      if (!isExisting) {
        this.records.resourceTargetCountries.push({
          id: targetCountryId,
          country_code: countryCode,
          resource_id: resourceId,
          created_at: now.toString(),
          updated_at: now.toString(),
        });
      }
    }

    this.save();
  }

  public static deleteTargetCountries(resourceId: string, countryCodes: string[]) {
    for (let i = 0; i < countryCodes.length; i += 1) {
      const countryCode = countryCodes[i];

      for (let j = 0; j < this.records.resourceTargetCountries.length; j += 1) {
        const record = this.records.resourceTargetCountries[j];
        if (record.country_code === countryCode) {
          this.records.resourceTargetCountries.splice(j, 1);
        }
      }
    }

    this.save();
  }

  public static findExceptedCountries(resourceId: string): string[] {
    const countryCodes: string[] = [];
    for (const resourceExceptedCountryRecord of this.records.resourceExceptedCountries) {
      if (resourceExceptedCountryRecord.resource_id === resourceId) {
        countryCodes.push(resourceExceptedCountryRecord.country_code);
      }
    }
    return countryCodes;
  }

  public static createExceptedCountries(resourceId: string, countryCodes: string[]) {
    const now = new Date();
    for (let i = 0; i < countryCodes.length; i += 1) {
      const countryCode = countryCodes[i];
      const lastExceptedCountryRecord = this.records.resourceExceptedCountries[
        this.records.resourceExceptedCountries.length - 1
      ];
      const exceptedCountryId = lastExceptedCountryRecord ? String(Number(lastExceptedCountryRecord.id) + 1) : '1';

      let isExisting = false;

      for (let j = 0; j < this.records.resourceExceptedCountries.length; j += 1) {
        const record = this.records.resourceExceptedCountries[j];
        if (record.country_code === countryCode) {
          isExisting = true;
          record.updated_at = now.toString();
        }
      }

      if (!isExisting) {
        this.records.resourceExceptedCountries.push({
          id: exceptedCountryId,
          country_code: countryCode,
          resource_id: resourceId,
          created_at: now.toString(),
          updated_at: now.toString(),
        });
      }
    }

    this.save();
  }

  public static deleteExceptedCountries(resourceId: string, countryCodes: string[]) {
    for (let i = 0; i < countryCodes.length; i += 1) {
      const countryCode = countryCodes[i];

      for (let j = 0; j < this.records.resourceExceptedCountries.length; j += 1) {
        const record = this.records.resourceExceptedCountries[j];
        if (record.country_code === countryCode) {
          this.records.resourceExceptedCountries.splice(j, 1);
        }
      }
    }

    this.save();
  }

  public static save() {
    const resourcesString = csvStringify(this.records.resources, this.columns.resources);
    const resourceContentsString = csvStringify(this.records.resourceContents, this.columns.resourceContents);
    const resourceAttributesString = csvStringify(this.records.resourceAttributes, this.columns.resourceAttributes);
    const resourceRelationsString = csvStringify(this.records.resourceRelations, this.columns.resourceRelations);
    const resourceTargetContriesString = csvStringify(
      this.records.resourceTargetCountries,
      this.columns.resourceTargetCountries,
    );
    const resourceExceptedContriesString = csvStringify(
      this.records.resourceExceptedCountries,
      this.columns.resourceExceptedCountries,
    );

    fsExtra.outputFile(this.filePaths.resources, resourcesString);
    fsExtra.outputFile(this.filePaths.resourceContents, resourceContentsString);
    fsExtra.outputFile(this.filePaths.resourceAttributes, resourceAttributesString);
    fsExtra.outputFile(this.filePaths.resourceRelations, resourceRelationsString);
    fsExtra.outputFile(this.filePaths.resourceTargetCountries, resourceTargetContriesString);
    fsExtra.outputFile(this.filePaths.resourceExceptedCountries, resourceExceptedContriesString);
  }
}
