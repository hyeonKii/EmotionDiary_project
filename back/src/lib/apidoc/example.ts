/**
 * @api               {get} /users/new 회원가입
 *
 * @apiDescription   새로운 유저를 등록합니다.
 *
 * @apiVersion        1.0.0
 * @apiName           이건 대체뭘까1?
 * @apiGroup          products
 *
 * @apiParam {String} name 이름
 * @apiParam {String} address 주소
 * @apiParam {String} [address_detail] 상세 주소
 * @apiParam {Number} post_num 우편 번호
 *
 * @apiSampleRequest  /api/v1/users/create
 *
 * @apiHeader {String} Authorization='Bearer KYVAFULuO7fDHjZ3oiCLgYGdTclmkGKLyiakSFqg'
 *
 * @apiExample {curl} Example usage:
 *     curl  --header "Content-Type: application/json"\
 *           --header "Authorization: Bearer 1|KYVAFULuO7fDHjZ3oiCLgYGdTclmkGKLyiakSFqg" \
 *           --request POST \
 *           --data '{"name":"홍길동", "address": "제주도", "address_detail: "성산읍", post_num: 12345 }' \
 *           http://api.example.com/api/v1/users/create
 *
 * @apiParamExample {dn} Request-Example:
 * {
 *  "name": "홍길동", "address": "제주도"
 * }
 *
 * @apiSuccess {String} result ok
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *      {
 *        "result": true
 *      }
 *
 * @apiError {String} message 결과 메시지
 * @apiError {String[]} errors 상세 에러 메시지
 *
 * @apiErrorExample   422 IP 허용 안 됨
 *     HTTP/1.1 422 Unprocessable Entity
 *      {
 *        "data": {
 *           "message": "Unprocessable Entity",
 *           "errors" : [
 *                "이름은 필수 필드입니다."
 *           ]
 *        }
 *     }
 *
 * @apiErrorExample   422 파라미터 에러
 *     HTTP/1.1 422 Unprocessable Entity
 *      {
 *        "data": {
 *          "message": "Unprocessable Entity",
 *          "errors" : [
 *                "우편번호 형식이 아닙니다."
 *           ]
 *         }
 *      }
 */
