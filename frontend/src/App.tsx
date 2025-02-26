import './App.css';
import { LoginForm } from './components/LoginForm/LoginForm';
import { RegisterForm } from './components/RegisterForm/RegisterForm';

export const App = () => {
    return (
        <>
            <h1>Hello World</h1>
            <div className="authContainter">
                <LoginForm />
                <RegisterForm />
            </div>
        </>
    );
};
