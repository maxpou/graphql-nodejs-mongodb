# GraphQL MongoDB Server

GraphQL server in Node.js using Express, MongoDB and Mongoose.  
Forked from: https://github.com/bruno12mota/graphql-nodejs. Many thanks to him :)

## Installation&running

1. `npm install`
2. `npm start`
3. Go to http://localhost:4000/graphql with your browser

## Requests sample

### Queries

* List all posts:

    ```
    {
      blogPosts {
        _id
        title
        description
      }
    }
    ```

### Mutations

* Adding a post:

    ```
    mutation {
      addBlogPost(data: {title: "Mutation", description: "Update or delete your datas!"})
    }
    ```

* Adding a comment:

    ```
    mutation {
      addComment(data: {
        postId:"5808e93dad0a0d08c45a6554",
        text: "very good post!!!"
      })
    }
    ```

## License

<details>
  <summary>MIT *(clic for details)*</summary>
  The MIT License (MIT) Copyright (c)

  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
</details>
