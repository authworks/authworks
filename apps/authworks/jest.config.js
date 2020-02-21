module.exports = {
  name: 'authworks',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/authworks',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
