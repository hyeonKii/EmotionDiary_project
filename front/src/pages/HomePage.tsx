import Home from "@/components/home/Home";
import PostList from "@/components/home/PostList";
import { Wrapper } from "@/styles/home/page-style";

export default function MainPage() {
    return (
        <Wrapper>
            <Home />
            <PostList />
        </Wrapper>
    );
}
