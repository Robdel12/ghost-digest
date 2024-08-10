# Ghost Digest Generator GitHub Action

## Overview

This GitHub Action generates daily or weekly digests for a Ghost blog. It fetches posts from the
Ghost Admin API, filters them based on the specified period, and creates a new digest post with
customizable tags and title. The action also supports debug logging and allows for timezone
customization.

## Inputs

- **`url`**: *(Required)* URL of the Ghost blog.
- **`period`**: *(Required)* Digest period. Choose between `daily` or `weekly`. Defaults to `daily`.
- **`debug`**: *(Optional)* Enable debug logging. Defaults to `false`.
- **`tags`**: *(Optional)* Comma-separated list of tags for the digest post. Defaults to `Digest`.
- **`title`**: *(Optional)* Title of the digest post. Defaults to `{{period}} Digest`.
- **`timezone`**: *(Optional)* Timezone to use for date calculations. Defaults to `America/Chicago`.

## Environment Variable

- **`GHOST_API_KEY`**: *(Required)* Admin API key from your Ghost Admin integrations section

## Outputs

- **`result`**: The result of the digest generation, including the slug of the created post.

## Usage

### Example Workflow

```yaml
name: Daily Digest

on:
  schedule:
    - cron: '0 4 * * *' # Runs at 4 AM UTC, which is 11 PM CDT
  workflow_dispatch: # Allows manual triggering of the workflow

jobs:
  generate-digest:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Generate Digest
        uses: robdel12/ghost-digest@v1.0.0
        with:
          url: 'https://example-url.com'
          period: daily
          debug: true
          tags: Digest,Daily
          title: 'Daily Digest'
          timezone: America/New_York
        env:
          GHOST_API_KEY: ${{ secrets.GHOST_API_KEY }}
```

## Development

To test and develop this action locally, you can run it with Node.js. Make sure you have all
dependencies installed:

```bash
npm install
node index.js
```

Make sure to set the necessary environment variables for local testing, such as `GHOST_API_KEY`.

## License

This action is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
