export default {
  computed: {
    filteredBlogs: function () {
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search);
      });
    },
    filteredAnimes: function () {
      return this.topAnime.filter((anime) => {
        return anime.node.title
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
};
