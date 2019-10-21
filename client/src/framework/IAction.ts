export enum ActionType {
    INIT = "@@INIT",
    login_error = "login_error",
    user_logged_in = "user_logged_in",
    user_logged_out = "user_logged_out",
    update_user = "update_user",
    user_created = "user_created",
    user_exists = "user_exists",
    create_lesson = "create_lesson",
    update_lesson = "update_lesson",
    delete_lesson = "delete_lesson",
    render_test = "render_test",
    server_called = "server_called",
    lesson_updated = "lesson_updated",
    add_lessons_from_server = "add_lessons_from_server" 
}
export interface IAction {
    type: ActionType;
}
