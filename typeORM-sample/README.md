# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command

## TODO

- [ ] Set up entity test env
- [ ] resource.contentsは別にしたほうがいいかもしれない。for locale
  - [ ] そうじゃないときUpdateのときに、keyとかattrをflatに投げると思うけど、別言語のも変わってるのが違和感がある

## Models

- Resource
- ResourceContent
- ResourceMeta
- ResourceAttribute
- Label
- LabelContent
- LabelMeta
- Medium

## API

### Endpoints

Resources
- `POST /api/resources`
- `GET /api/resources?conditions=value`
- `GET /api/resources/:id`
- `PUT /api/resources/:id`
- `DELETE /api/resources/:id`
- `POST /api/resources/:id/contents?locale=value`
- `GET /api/resources/:id/contents`
- `GET /api/resources/:id/contents?locale=value`
- `PUT /api/resources/:id/contents?locale=value`
- `DELETE /api/resources/:id/contents?locale=value`
- `POST /api/resources/:id/meta?locale=value`
- `GET /api/resources/:id/meta`
- `GET /api/resources/:id/meta?locale=value`
- `PUT /api/resources/:id/meta?locale=value`
- `DELETE /api/resources/:id/meta?locale=value`
- `PUT /api/resources/:id/media/:mediaId`
- `DELETE /api/resources/:id/media/:mediaId`
- `PUT /api/resources/:id/attributes`
Labels
- `POST /api/labels`
- `GET /api/labels?conditions=value`
- `GET /api/labels/:id`
- `PUT /api/labels/:id`
- `DELETE /api/labels/:id`
- `POST /api/labels/:id/contents?locale=value`
- `GET /api/labels/:id/contents`
- `GET /api/labels/:id/contents?locale=value`
- `PUT /api/labels/:id/contents?locale=value`
- `DELETE /api/labels/:id/contents?locale=value`
- `POST /api/labels/:id/meta?locale=value`
- `GET /api/labels/:id/meta`
- `GET /api/labels/:id/meta?locale=value`
- `PUT /api/labels/:id/meta?locale=value`
- `DELETE /api/labels/:id/meta?locale=value`
- `PUT /api/labels/:id/media/:mediaId`
- `DELETE /api/labels/:id/media/:mediaId`
Media
- `POST /api/media`
- `GET /api/media`
- `GET /api/media/:id`
- `DELETE /api/media/:id`

### Resource

#### Create resource
`POST /api/resources?locale=value`
```
// localeがない場合、default localeを利用
{
  type: 'sample type',
  key: 'sample-key',
}
```

#### Get resources
`GET /api/resources?locale=value&conditions_key=value`
```
// localeがない場合、default localeを利用
```

#### Get resource
`GET /api/resources/:id?locale=value`
```
// localeがない場合、default localeを利用
```

#### Update resource
`PUT /api/resources/:id?locale=value`
```
// localeがない場合、default localeを利用
// keyが更新された場合、全てのlocaleのkeyが更新される
{
  key: 'sample-key',
  type: 'sample type',
  name: 'Sample Name',
  body: 'Sample Body',
  attr: 'Sample Attribute',
  attr2: null, // 削除
}
```

#### Delete resource
`DELETE /api/resources/:id`
```
// localeがない場合、全削除
```

#### Update meta
`PUT /api/resources/:id/meta?locale=value`
```
// localeがない場合、default localeを利用
{
  title: 'sample title',
  description: 'sample description',
  keywords: 'sample,keywords',
}
```

#### Attach media
`PUT /api/resources/:id/media/:mediaId`

#### Detach media
`DELETE /api/resources/:id/media/:mediaId`

### Label

#### Create label
`POST /api/labels?locale=value`
```
// localeがない場合、default localeを利用
{
  key: 'sample-key',
  type: 'sample type',
  name: 'Sample Name',
  body: 'Sample Body',
}
```

#### Get labels
`GET /api/labels?locale=value&conditions_key=value`
```
// localeがない場合、default localeを利用
```

#### Get label
`GET /api/labels/:id|:key?locale=value`
```
// localeがない場合、default localeを利用
```

#### Update label
`PUT /api/labels/:id|:key?locale=value`
```
// localeがない場合、default localeを利用
{
  key: 'sample-key',
  type: 'sample type',
  name: 'Sample Name',
  body: 'Sample Body',
}
```

#### Delete label
`DELETE /api/labels/:id|:key`
```
// localeがない場合、全削除
```

#### Update meta
`PUT /api/labels/:id/meta?locale=value`
```
// localeがない場合、default localeを利用
{
  title: 'sample title',
  description: 'sample description',
  keywords: 'sample,keywords',
}
```

#### Attach media
`POST /api/labels/:id/media/:mediaId`

#### Detach media
`DELETE /api/labels/:id/media/:mediaId`

### Medium

#### Create medium
`POST /api/media`
```
{
  caption: 'medium name',
  key: 'medium-key',
  body?: 'base64 string'
  url?: '/path/to/media'
}
```

#### Get media
`GET /api/media`

#### Get medium
`GET /api/media/:id`

#### Update medium
`PUT /api/media/:id`
```
{
  caption: 'medium name',
  key: 'medium-key',
  body?: 'base64 string'
  url?: '/path/to/media'
}
```

#### Delete medium
`DELETE /api/media/:id`
