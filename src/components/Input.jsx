import { forwardRef } from "react"

const Input = forwardRef(function (
  {extraClass, type, name, placeholder, required}, ref
) {
  return(
    <input 
      ref={ref}
      type={type}
      name={name}
      placeholder={placeholder}
      className={`popup__info ${extraClass}`}
    />
  )
}) 
export default Input;