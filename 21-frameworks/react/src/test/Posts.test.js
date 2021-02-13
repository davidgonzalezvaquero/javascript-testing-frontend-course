import {render, screen, waitFor} from "@testing-library/react";
import Posts from "../components/Posts";
import userEvent from "@testing-library/user-event";

const createPost = jest.fn();

const post = { title: "Test", content: "Test Content" };

jest.mock("../components/Form", () => {
    return {
        __esModule: true,
        default: (props) => {
            const handleSubmit = (event) => {
                event.preventDefault();
                props.submit(post);
            };

            return (
                <form onSubmit={handleSubmit}>
                    <button type="submit">Submit</button>
                </form>
            )
        },
    };
})

describe("Post component", () => {
    it("should list posts", async () => {
        require('../components/Form').default({submit: createPost});

        render(<Posts />);

        const titleContent = screen.getByText("Create new post");
        expect(titleContent).toBeInTheDocument();

        const button = screen.getByRole("button", {name: "Submit"});
        userEvent.click(button);

        await waitFor(() => {
            const postTitle = screen.getByText("Test");
            const postContent = screen.getByText("Test Content");

            expect(postTitle).toBeInTheDocument();
            expect(postContent).toBeInTheDocument();
        })
    })
})