import { AxiosError, HttpStatusCode } from 'axios';

export default class CatchError extends Error {
	constructor(err: unknown | any) {
		super(err);

		if (err instanceof AxiosError) {
			if (err.response?.status === HttpStatusCode.NotFound) {
				return {
					name: '',
					message: 'NOT FOUND',
				};
			} else if (err.response?.status === HttpStatusCode.InternalServerError) {
				return {
					name: '',
					message: 'INTERNAL SERVER ERROR',
				};
			} else {
				return {
					name: '',
					message: '',
				};
			}
		}
	}
}
