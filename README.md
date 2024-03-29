### Hexlet tests and linter status:
[![Actions Status](https://github.com/mrBertieWooster/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/mrBertieWooster/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/a2e2abfe4a395d994320/maintainability)](https://codeclimate.com/github/mrBertieWooster/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a2e2abfe4a395d994320/test_coverage)](https://codeclimate.com/github/mrBertieWooster/frontend-project-lvl2/test_coverage)

Get difference between two files
======================

# Installation

Clone repository and install
```sh
$ make install
```

code supports file types: `yaml`, `yml`, `json` and works with relative and absolute paths
* `$ gendiff before.json after.json` get diff in default format
* `$ gendiff before.yml after.yml --format json` get diff in JSON format
* `$ gendiff before.yml after.yml --format plain` get diff in plain format

## Examples

Diff JSON files in default format
=================================

[![asciicast](https://asciinema.org/a/xU6SuvdhhMXNg1IgmRMHlJ3MD.svg)](https://asciinema.org/a/xU6SuvdhhMXNg1IgmRMHlJ3MD)

Diff YAML files in default format
=================================

[![asciicast](https://asciinema.org/a/qu3I9ZIPHJNl7tW00db07A2n1.svg)](https://asciinema.org/a/qu3I9ZIPHJNl7tW00db07A2n1)

Diff YAML files in plain format
=================================

[![asciicast](https://asciinema.org/a/6GPkD2wk0LwqL2G0GFUq7dQJV.svg)](https://asciinema.org/a/6GPkD2wk0LwqL2G0GFUq7dQJV)

Diff JSON files in JSON format
=================================

[![asciicast](https://asciinema.org/a/gnVuKvV8UVUdtLoNohLMxT29E.svg)](https://asciinema.org/a/gnVuKvV8UVUdtLoNohLMxT29E)
