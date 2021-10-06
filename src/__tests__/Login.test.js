import { screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Login from "../pages/login/Login";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Login", () => {
  test("renders loading", async () => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  });

  test("renders loading", async () => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("Register")).toBeInTheDocument();
    });
  });

  test("has a ussername input field", async () => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Username')).toBeInTheDocument
    });
  });

  test("has a password input field", async () => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Password')).toBeInTheDocument
    });
  });

  test("has a password input field", async () => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
    await waitFor(() => {
      expect(screen.getByLabelText('Login As')).toBeInTheDocument
    });
  });
  
  test("passes login information", async () => {
    const queryClient = new QueryClient();
    return (
      <QueryClientProvider client={queryClient}>
        <Login />
      </QueryClientProvider>
    );
    const email = "tuti.wulandari";
    const password = '2771105'; 
    const selectedUserLevel ='customer'

    const wrapper = shallow(<Login handleLogin={state => {
      expect(state.email).to.be.equal(email);
      expect(state.password).to.be.equal(password);
      expect(state.selectedUserLevel).to.be.equal(selectedUserLevel);

    }}/>);
    wrapper.setState({ email: 'tuti.wulandari', password: '2771105', selectedUserLevel:'customer'});
    wrapper.find('Login').simulate('click');
  });

  });

