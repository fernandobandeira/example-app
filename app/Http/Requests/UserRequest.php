<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $rules = [
            'fullname' => 'required',
            'username' => 'required|unique:users,username',
        ];

        if (in_array($this->method(), ['PUT', 'PATCH'])) {
          $rules['username'] .= ','.$this->user->id;
        }

        return $rules;
    }
}
