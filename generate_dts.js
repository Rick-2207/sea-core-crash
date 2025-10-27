/**
 * cài đặt: npm install --save-dev dts-bundle-generator
 * chạy: node generate_dts.js
 */

const { generateDtsBundle } = require('dts-bundle-generator');
const fs = require('fs');
const path = require('path');
const webpackConfig = require('./webpack.config.js');
const fileName = webpackConfig.output.filename.replace('.js', '.d.ts');

const config = {
  moduleName: webpackConfig.output.library,

  entryFile: path.resolve(__dirname, webpackConfig.entry),
  outFile: path.resolve(__dirname, 'dist/' + fileName),

  options: {
    preferredExportName: webpackConfig.output.library,
    compilationOptions: {
      followSymlinks: false,
      skipAddingFilesFromTsConfig: true,
      allowJs: true
    },
    output: {
      inlineDeclareExternals: true,
      inlineDeclareGlobals: true,
      sortNodes: true,
      exportReferencedTypes: true,
      noBanner: true
    }
  }
};

console.log('🚀 Bắt đầu tạo file khai báo TypeScript...');

try {
  const distDir = path.dirname(config.outFile);
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
    console.log(`✅ Đã tạo thư mục: ${distDir}`);
  }

  console.log(`📝 Đang tạo bundle từ: ${config.entryFile}`);
  const result = generateDtsBundle([
    {
      filePath: config.entryFile,
      libraries: {
        inlinedLibraries: [],
        allowedTypesLibraries: [],
        importedLibraries: []
      },
      output: {
        noBanner: config.options.output.noBanner,
        inlineDeclareExternals: config.options.output.inlineDeclareExternals,
        inlineDeclareGlobals: config.options.output.inlineDeclareGlobals,
        sortNodes: config.options.output.sortNodes,
        exportReferencedTypes: config.options.output.exportReferencedTypes
      }
    }
  ], {
    preferredConfigPath: path.resolve(__dirname, 'tsconfig.json'),
    followSymlinks: config.options.compilationOptions.followSymlinks,
    skipAddingFilesFromTsConfig: config.options.compilationOptions.skipAddingFilesFromTsConfig
  });

  let outputContent = result[0];

  if (config.moduleName) {
    let namespaceContent = '';

    const lines = outputContent.split('\n');
    for (const line of lines) {
      if (line.trim()) {
        namespaceContent += '    ' + line.replace(/^\s*declare\s+/, '') + '\n';
      }
    }

    namespaceContent = namespaceContent.replace(/\n\s*\n+/g, '\n');

    outputContent = `declare namespace ${config.moduleName} {\n${namespaceContent}}`;
  }

  fs.writeFileSync(config.outFile, outputContent);
  console.log(`✅ Đã tạo thành công file: ${config.outFile}`);
} catch (error) {
}