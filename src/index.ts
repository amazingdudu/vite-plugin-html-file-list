import * as fs from 'fs';
import * as path from 'path';

import type { Plugin } from 'vite';

export interface Options {
    dir?: string;
}

function listHtmlFile({ dir = 'src' }: Options = {}): Plugin {
    return {
        name: 'vite-plugin-file-list-file',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url === '/') {
                    const files = getHtmlFiles(path.join(process.cwd(), req.url, dir));

                    const data = files.map(file => {
                        const result = file.match(new RegExp(`${process.cwd()}(/${dir}(.*))`))!;
                        return {
                            path: result[1],
                            filename: result[2]
                        };
                    });
                    res.end(generateHtml(data));
                } else {
                    next();
                }
            });
        }
    };
}

function getHtmlFiles(dir: string) {
    const results: string[] = [];
    const list = fs.existsSync(dir) ? fs.readdirSync(dir) : [];

    if (list.length === 0) {
        return [];
    }

    list.forEach(item => {
        const file = path.join(dir, item);
        const stats = fs.lstatSync(file);

        if (stats.isDirectory()) {
            results.push(...getHtmlFiles(file));
        } else if (stats.isFile() && item.endsWith('.html')) {
            results.push(file);
        }
    });

    return results;
}

function generateHtml(
    data: {
        filename: string;
        path: string;
    }[]
) {
    return `<!DOCTYPE html>
              <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>目录</title>
                    <style>
                        * {
                            margin: 0;
                            padding: 0;
                        }
                        ul {
                            padding: 0 20px;
                        }
                        li {
                            list-style: none;
                            text-align: center;
                            border-bottom: 1px dashed #000;
                        }
                        a,
                        a:visited,
                        a:hover {
                            display: block;
                            width: 100%;
                            padding: 15px 0;
                            word-break: break-all;
                            color: deepskyblue;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <ul>
                        <li><a href="..">..</a></li>
                        ${data
                            .map(item => `<li><a href="${item.path}">${item.filename}</a></li>`)
                            .join('')}
                    </ul>
                </body>
            </html>`;
}

export default listHtmlFile;
