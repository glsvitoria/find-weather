import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { useRef, useCallback, useState } from "react";

import { AttachmentData } from "@/types/types";
import * as Yup from "yup";
import getValidationErrors from "@/utils/getValidationErrors";
import { Sended } from "../animations/sended";
import Input from "../form/input";
import Textarea from "../form/textarea";
import Dropzone from "../form/dropzone";
import Button from "../button";

type FormDataType = {
  name: string;
  email: string;
  subject: string;
  message: string;
  files: AttachmentData[];
};

export function Contact() {
  const formRef = useRef<FormHandles>(null);
  const [attachments, setAttachments] = useState<AttachmentData[]>([]);
  const [isSended, setIsSended] = useState(false);

  const handleSubmit = useCallback(async (data: FormDataType) => {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      name: Yup.string().required("O nome é obrigatório"),
      email: Yup.string().required("O e-mail é obrigatório"),
      subject: Yup.string().required("O assunto é obrigatório"),
      message: Yup.string().required("A mensagem é obrigatória"),
    });

    try {
      await schema.validate(data, { abortEarly: false });
      console.log(data);

      setTimeout(() => {
        setIsSended(true);
      }, 1000);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <section className="flex flex-col gap-12 my-8 pb-12">
      {!isSended ? (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="lg:text-5xl md:text-3xl xs:text-lg">
              Entre em contato conosco!
            </h1>
            <p className="lg:text-base md:text-sm text-xs text-zinc-600">
              Estamos aqui para ouvir você! Entre em contato conosco para tirar
              dúvidas, compartilhar ideias ou resolver qualquer questão. Sua
              opinião é fundamental para nós. Juntos, construímos uma comunidade
              melhor.
            </p>
          </div>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="flex md:flex-row flex-col md:gap-4 gap-6">
              <Input name="name" placeholder="Digite o seu nome" label="Nome" />
              <Input
                name="email"
                placeholder="Digite o seu e-mail"
                label="E-mail"
                type="email"
              />
            </div>
            <Input
              name="subject"
              placeholder="Digite o assunto da mensagem"
              label="Assunto"
            />
            <Textarea
              name="message"
              label="Mensagem"
              placeholder="Digite a sua mensagem"
            />
            <Dropzone
              name="files"
              label="Arquivos"
              attachments={attachments}
              setAttachments={setAttachments}
            />
            <Button type="submit">Enviar formulário</Button>
          </Form>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <h1 className="md:text-5xl xxs:text-3xl text-2xl">
              Sua mensagem foi enviada
            </h1>
            <p className="xxs:text-sm text-xs text-zinc-600">
              Sua mensagem já foi enviada para a nossa equipe. Em breve
              entraremos em contato com você. Obrigado!
            </p>
          </div>
          <Sended />
        </>
      )}
    </section>
  );
}
