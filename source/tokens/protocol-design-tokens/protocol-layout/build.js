const fs = require('fs');
const units = require('./units/protocol-units.json');
const metadata = require('./package.json');

const jsLicense = `/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
`;

// Units

function createUnits(property, format) {
    const rv = [];

    for (const size in units[property]) {
        var value;

        if (size === 'xxs') {
            value = `${units[property].xxs}`;
        } else if (size === 'xs') {
            value = `${units[property].xs}`;
        } else if (size === 'sm') {
            value = `${units[property].sm}`;
        } else if (size === 'md') {
            value = `${units[property].md}`;
        } else if (size === 'lg') {
            value = `${units[property].lg}`;
        } else if (size === 'xl') {
            value = `${units[property].xl}`;
        } else if (size === 'xxl') {
            value = `${units[property].xxl}`;
        } else {
            value = `${units[property].base}`;
        }
        rv.push(format.formatter(property, size, value));
    }

    if (format.group_end === undefined) {
        format.group_end = '\n';
    }
    if (format.group_end) {
        rv.push(format.group_end);
    }
    return rv;
}

const formatsUnits = {
    'css': {
        'output': [`${jsLicense}\n/* Protocol Colors CSS Variables v${metadata.version} */\n\n:root {\n`],
        'formatter': (property, size, value) => {
            if (isNaN(value)) {
                return `  --${property}-${size}: var(--${value});\n`;
            } else {
                return `  --${property}-${size}: ${value}px;\n`;
            }
        },
        'footer': '}\n',
        'ext': 'css'
    },
    'js': {
        'output': [`${jsLicense}\n/* Protocol Colors JS Variables v${metadata.version} */\n\n`],
        'formatter': (property, size, value) => {
            if (isNaN(value)) {
                return; //`exports.${property.toUpperCase()}_${size.toUpperCase()}: @${value};\n`
            } else {
                return `exports.${property.toUpperCase()}_${size.toUpperCase()} = '${value}px';\n`;
            }
        },
        'ext': 'js'
    },
    'less': {
        'output': [`${jsLicense}\n/* Protocol Colors Less Variables v${metadata.version} */\n\n`],
        'formatter': (property, size, value) => {
            if (isNaN(value)) {
                return `@${property}-${size}: @${value};\n`;
            } else {
                return `@${property}-${size}: ${value}px;\n`;
            }
        },
        'ext': 'less'
    },
    'sass': {
        'output': [`${jsLicense}\n/* Protocol Units SCSS Variables v${metadata.version} */\n\n`],
        'formatter': (property, size, value) => {
            if (isNaN(value)) {
                return `$${property}-${size}: $${value};\n`;
            } else {
                return `$${property}-${size}: ${value}px;\n`;
            }
        },
        'ext': 'scss'
    }
};

for (const property in units) {
    for (const key in formatsUnits) {
        const format = formatsUnits[key];
        format.output.push(...createUnits(property, format));
    }
}


// output key/value formats to files
for (let key in formatsUnits) {
    const format = formatsUnits[key];
    if (format.footer) {
        format.output.push(format.footer);
    }
    let out_func = format.outputter;
    if (!out_func) {
        out_func = (data) => data.join('');
    }
    fs.writeFile(`units/protocol-units.${format.ext}`, out_func(format.output), 'utf8', (err) => {
        if (err) throw err;
    });
}
