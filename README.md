# Data Science and Research Software Engineering Training

Landing page for the University of Bristol [data science and research software engineering training](https://bristol-training.github.io/).

## Training courses we offer

Most users will want to [look at the courses on our website](https://bristol-training.github.io/) for more information. Many courses are can be self-led and also have pre-recorded videos linked to.

## Making changes to the website

We are happy to receive issues or pull requests for this website. Members of the team can also get push access from an admin.

We use [Quarto](https://quarto.org/) to build the website, and this happens automatically when you push your changes back up to GitHub, via a [GitHub Action](https://github.com/Bristol-Training/bristol-training.github.io/blob/main/.github/workflows/publish-page.yaml).

To add courses, please edit the `.yml` files in the [`courses` directory](https://github.com/Bristol-Training/bristol-training.github.io/tree/main/courses). We use [Quarto listings](https://quarto.org/docs/websites/website-listings.html#yaml-listing-content) to compile these onto the landing page.

This project is built with Quarto (https://quarto.org). Dependencies
are managed using [uv](https://docs.astral.sh/uv/) (installation
instructions [here](https://docs.astral.sh/uv/getting-started/installation/).

Once uv is installed, you can render local changes with:

```
uv run quarto preview
```

## License

This content is licensed under Creative Commons Attribution 4.0 International (CC BY 4.0), unless specified otherwise.

To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0/
