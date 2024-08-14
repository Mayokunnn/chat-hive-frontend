import { getInitials } from "../utils/helpers";

interface Props{
    name: string|undefined,
    image: string|undefined |null,
    active?: boolean|undefined;
    status?: boolean
    size?:string
}

export default function Avatar({name, image, active, status, size}: Props) {
  return (
    image ? (
        <div
          className={`avatar bg-secondary cursor-pointer ${
            active ? "online" : ""
          } `}
        >
          <div className={`${size == 'small' ? "w-10": "w-12"} rounded-full ${status ? "skeleton" : ""}`}>
            <img src={image} className={status ? "skeleton" : ""} />
          </div>
        </div>
      ) : (
        <div
          className={`avatar placeholder ${
            active ? "online" : ""
          } `}
        >
          <div className={`${status ? "skeleton" : "bg-secondary"} text-secondary-content font-medium ${size == 'small' ? "w-10": "w-16"} rounded-full`}>
            <span className={`${size =="small" ? "text-sm" :"text-xl"} ${status ? "skeleton" : ""}`}>
              {name && getInitials?.(name)}
            </span>
          </div>
        </div>
      )
  )
}
