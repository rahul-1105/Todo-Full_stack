import Todo from "../Todo/Todo";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";

const Todos = () => {
  const array = useSelector((state) => state.todos.todos);
  const loading = useSelector((state) => state.loading.loading);
  // console.log(array);

  return loading ? (
    <Loader />
  ) : (
    <div
      className={
        array.length === 0
          ? "h-full flex justify-center items-center"
          : array.length <= 2
          ? " p-8 max-sm:px-4 max-sm:py-8 grid grid-cols-[repeat(auto-fit,_minmax(0,_464px))] gap-8 max-lg:grid-cols-1 max-lg:justify-normal"
          : " p-8 max-sm:px-4 max-sm:py-8 grid grid-cols-[repeat(auto-fit,_minmax(_464px,_1fr))] max-lg:grid-cols-1 gap-8 justify-center max-lg:justify-normal"
      }>
      {array.length === 0 ? (
        <h1 className="text-4xl text-gray-800">No Todos</h1>
      ) : (
        array.map((todo) => <Todo key={todo.id} todo={todo} todoId={todo.id} />)
      )}
    </div>
  );
};

export default Todos;
