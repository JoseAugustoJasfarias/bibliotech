import React from "react";
import { useForm } from "react-hook-form";
import "./Postagem.css"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
// // 
// import { ThemeContext } from "../../contexts/ThemeContext"
// // 

const validationPostagem = yup.object().shape({

    description: yup.string().required("A descrição é obrigatório").max(80, "A descrição precisa ter menos de 80 caracteres"),
    content: yup.string().required("A postagem é obrigatório").max(128, "A postagem precisa ter menos de 128 caracteres")

})

export function Postagem() {


    //     const resultado = useContext(ThemeContext)

    //     useEffect(() => {
    //         initializeTable();
    //     }, []);

    //     function initializeTable() {
    //         getLivros().then(resultados => {
    //             setLivros(resultados)
    //         })
    //     }
    // // 

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationPostagem)
    })

    const onSubmit = data => console.log(data)



    return (
        <div>

            <main>
                <div className="card-post">

                    <h1>Criar postagem</h1>
                    <div className="line-post"></div>
                    <div className="card-body-post">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className="fields">
                                <label>Nome</label>
                                <input type="text" name="title" {...register("name")} />
                                <p className="error-message">{errors.title?.message}</p>
                            </div>

                            <div className="fields">
                                <label>Descrição</label>
                                <input type="text" name="description" {...register("description")} />
                                <p className="error-message">{errors.description?.message}</p>
                            </div>

                            <div className="fields">
                                <label>Postagem</label>
                                <textarea type="text" name="content" {...register("content")}></textarea>
                                <p className="error-message">{errors.content?.message}</p>
                            </div>
                            <div className="btn-post">
                                <button type="submit">Enviar</button>

                            </div>

                        </form>
                    </div>

                </div>
            </main>
        </div>
    )
}

