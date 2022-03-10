import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../../redux";
import "@testing-library/jest-dom";
import AccountPostsList from "../AccountPostsList";
import AccountEventsList from "../AccountEventsList";
import AccountLikedNotesList from "../AccountLikedNotes";

const MockAccountsPostList = () => {
  const posts = [];
  return (
    <Provider store={store}>
      <AccountPostsList posts={posts} errMsg={"User has not got any posts."} />
    </Provider>
  );
};

const MockAccountsEventsList = () => {
  const events = [];
  return (
    <Provider store={store}>
      <AccountEventsList
        events={events}
        errMsg={"User has not got any events."}
      />
    </Provider>
  );
};

const MockAccountsNotesList = () => {
  const notes = [];
  return (
    <Provider store={store}>
      <AccountLikedNotesList
        notes={notes}
        errMsg={"User has not got any notes."}
      />
    </Provider>
  );
};

describe("AccountPostsList", () => {
  test("should render no posts error if there are no posts", async () => {
    render(<MockAccountsPostList />);
    const noPostsError = await screen.findByText("User has not got any posts.");
    expect(noPostsError).toBeInTheDocument();
  });
});

describe("AccountEventsList", () => {
  test("should render no events error if there are no events", async () => {
    render(<MockAccountsEventsList />);
    const noEventsError = await screen.findByText(
      "User has not got any events."
    );
    expect(noEventsError).toBeInTheDocument();
  });
});

describe("AccountLikedNotesList", () => {
  test("should render no events error if there are no notes", async () => {
    render(<MockAccountsNotesList />);
    const noNotesError = await screen.findByText("User has not got any notes.");
    expect(noNotesError).toBeInTheDocument();
  });
});
