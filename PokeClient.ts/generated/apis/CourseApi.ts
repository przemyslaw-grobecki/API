import UserApi from "./UserApi";
import BaseApi from "../../BaseApi";
import { Token } from "../../IUserAuthentication";
import { Course } from "../resources/Course";
import { COURSE_ROUTE } from "../routes/CourseRoute";

export default class CourseApi extends BaseApi<Course> {
	/**	 * Standard CRUD	 */

	public Post = async (course: Course) : Promise<void> => {
		await this.HttpPost(COURSE_ROUTE, course);
	}

	public GetAll = async () : Promise<Array<Course>> => {
		return await this.HttpGetAll(COURSE_ROUTE);
	}

	public Get = async (id: string) : Promise<Course> => {
		return await this.HttpGet(COURSE_ROUTE + "/" + id);
	}

	/**
	* Course children APIs
	*/
	public getUserApi = (courseId: string, token: Token) => {
		return new UserApi(this.priorPath + COURSE_ROUTE + "/" + courseId, token);
	}
}
