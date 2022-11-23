/**
 * @api               {post} /diaries/write WriteDiary
 *
 * @apiDescription   새로운 일기를 작성합니다.
 *
 * @apiVersion        1.0.0
 * @apiName           Diary
 * @apiGroup          Diary
 *
 * @apiParam {String} userID 유저 아이디
 * @apiParam {String} title 제목
 * @apiParam {String} description 상세 내용
 *
 * @apiSampleRequest  /api/diaries/write
 *
 * @apiHeader {String} Authorization='Bearer KYVAFULuO7fDHjZ3oiCLgYGdTclmkGKLyiakSFqg'
 *
 *
 * @apiParamExample {dn} Request-Example:
 *{
 * "userID": "jlee7003",
 * "title":"5",
 * "description":"description121212"
 *}
 *
 * @apiSuccess {String} content true
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "result": true
 *      }
 *
 * @apiError {String} errors 상세 에러 메시지
 *
 * @apiErrorExample   400 ArgumentError
 *     Wrong argument
 *
 * @apiErrorExample   401 InvalidTokenError
 *     Token is invalid
 */
