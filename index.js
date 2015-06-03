var through = require('through');
var path = require('path');
var gutil = require('gulp-util');
var doT = require('dot');
var PluginError = gutil.PluginError;
var File = gutil.File;

module.exports = function(opt) {
    if (!opt) opt = {};
    if (!opt.fileName) throw new PluginError('gulp-dotjs-packer', 'Missing fileName option for gulp-dotjs-packer');
    if (!opt.newLine) opt.newLine = gutil.linefeed;
    if (!opt.variable) opt.variable = "JST";
    if (!opt.processName) opt.processName = function(pathName, base, cwd) {
        return pathName.replace(base, "").replace(path.extname(pathName), "");
    };
    if (!opt.templateSettings) opt.templateSettings = doT.templateSettings;

    var buffer = [];
    var firstFile = null;
    var fileName = opt.fileName;
    var processName = opt.processName;
    var variable = opt.variable;
    var templateSettings = opt.templateSettings;
    var wrap = typeof opt.wrap !== "undefined" ? opt.wrap : {};

    function handleCompile(content, settings, defs, variable, path) {
        var template = "";
        var compiled = doT.template(content, settings, defs).toString();
        template += variable + "['" + path + "'] = " + compiled;
        return template;
    }

    function proccessContents(contents) {
        return contents.toString('utf8')
    }

    function bufferContents(file) {
        if (file.isNull()) return;
        if (file.isStream()) return this.emit('error', new PluginError('gulp-dotjs-packer', 'Streaming not supported'));

        if (!firstFile) firstFile = file;
        buffer.push(handleCompile(proccessContents(file.contents), templateSettings, {}, variable, processName(file.path, file.base, file.cwd)));
    }

    function endStream() {
        if (buffer.length === 0) return this.emit('end');

        var joinedContents = buffer.join(opt.newLine);
        var content;

        if(wrap.start && wrap.end) {
            content = wrap.start + joinedContents + wrap.end;
        } else if(wrap!== false) {
            content = "(function(root, factory) { if (typeof define === 'function' && define.amd) { define(factory); } else { root['" + variable + "'] = factory(); } }(this, function() {\r\nvar " + variable + " = " + variable + " || {}; \r\n" + joinedContents + " \r\nreturn " + variable + "; \r\n}));"
        } else {
            content = joinedContents;
        }

        var joinedPath = path.join(firstFile.base, fileName);

        var joinedFile = new File({
            cwd: firstFile.cwd,
            base: firstFile.base,
            path: joinedPath,
            contents: new Buffer(content)
        });

        this.emit('data', joinedFile);
        this.emit('end');
    }

    return through(bufferContents, endStream);
};
