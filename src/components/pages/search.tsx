import { Form } from "@unform/web";
import Input from "../form/input";
import { useCallback, useRef, useState } from "react";
import { FormHandles } from "@unform/core/typings";
import Button from "../button";
import { MagnifyingGlass, Question } from "@phosphor-icons/react";
import * as Yup from "yup";
import getValidationErrors from "@/utils/getValidationErrors";
import { TableResults } from "../tableResults";
import { IResultsAddress } from "@/types/types";
import { api } from "@/services/api";

export function Search() {
  const [results, setResults] = useState<IResultsAddress[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const [errorInRequest, setErrorInRequest] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: { street: string }) => {
    formRef.current?.setErrors({});

    const schema = Yup.object().shape({
      street: Yup.string().required("Nome da rua é obrigatório"),
    });

    try {
      const schemaValidated = await schema.validate(data, {
        abortEarly: false,
      });

      const response = await api.get("/autocomplete", {
        params: {
          text: data.street,
        },
      });

      if (response.status !== 200) {
        setErrorInRequest(true);
        return;
      }

      setResults(response.data.features.slice(0, 5));
      setIsSearched(true);
    } catch (error: any) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }
    }
  }, []);

  return (
    <section className="flex flex-col lg:gap-12 gap-8 my-8">
      <h1 className="lg:text-5xl md:text-3xl xs:text-lg">
        Busque pelo seu CEP
      </h1>
      <Form
        ref={formRef}
        onSubmit={handleSubmit}
        className="md:grid lg:grid-cols-4 md:grid-cols-5 flex flex-col gap-4"
      >
        <Input
          name="street"
          placeholder="Digite o nome da rua"
          containerClassName="col-span-3"
        />
        <Button type="submit" className="lg:col-span-1 col-span-2">
          <MagnifyingGlass size={24} />
          Buscar CEP
        </Button>
      </Form>
      {errorInRequest && (
        <span className="text-error lg:-mt-8 -mt-4">
          Ocorreu um erro na busca, tente novamente!
        </span>
      )}

      <div className="h-full flex flex-col gap-2">
        {isSearched && (
          <header>
            <h1 className="lg:text-3xl md:text-xl xs:text-lg">
              Resultado da busca
            </h1>
            <p className="text-zinc-600 lg:text-base md:text-sm text-xs">
              {results.length} resultados encontrados
            </p>
          </header>
        )}
        {results.length > 0 ? (
          <TableResults results={results} />
        ) : isSearched ? (
          <div className="w-full mt-12 gap-4 flex flex-col items-center justify-center opacity-50">
            <Question className="md:text-9xl text-7xl" />
            <p className="xs:text-xl text-center">
              Nenhum resultado foi encontrado. Tente outro endereço.
            </p>
          </div>
        ) : (
          <div className="w-full mt-12 gap-4 flex flex-col items-center justify-center opacity-50">
            <MagnifyingGlass className="md:text-9xl text-7xl" />
            <p className="xs:text-xl text-center">
              Faça a busca para podermos mostrar os resultados.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
