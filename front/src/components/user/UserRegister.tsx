import { useRequestRegisterUser } from "@/api/user";
import useForm from "@/hooks/useForm";
import validationFn from "@/validations/userRegisterValidation";

function UserRegister() {
    const { form, changeHandler } = useForm(
        { email: "", userID: "", nickname: "", password: "" },
        validationFn
    );

    const { mutate: register } = useRequestRegisterUser(form, {
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error.message);
        },
    });

    const registerUser = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        register();
    };

    return (
        <form onSubmit={registerUser}>
            <label htmlFor="email">이메일</label>
            <input type="email" id="email" onChange={changeHandler} />
            <label htmlFor="userID">아이디</label>
            <input type="text" id="userID" onChange={changeHandler} />
            <label htmlFor="nickname">별명</label>
            <input type="text" id="nickname" onChange={changeHandler} />
            <label htmlFor="password">비밀번호</label>
            <input type="password" id="password" onChange={changeHandler} />
            <button>회원가입</button>
        </form>
    );
}

export default UserRegister;
