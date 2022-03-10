import { render, screen } from "@testing-library/react";
import PostList from "../../components/home/PostList";
import { Provider } from "react-redux";
import store from "../../redux";
import "@testing-library/jest-dom";

test("should render no posts error if there are no posts", async () => {
  const posts = [];
  render(
    <Provider store={store}>
      <PostList posts={posts} />
    </Provider>
  );
  const noPostsError = await screen.findByText(
    "Start following other users to see more posts."
  );
  expect(noPostsError).toBeInTheDocument();
});
