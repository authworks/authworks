module.exports = {
  name: 'webconsole',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/webconsole',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
