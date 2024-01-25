import { createContext, useState } from "react";
import { useMutation } from "react-query";
import { useToast } from "../ui/use-toast";

type ContextType = {
  addMessage: () => void;
  message: string;
  handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
};

export const ChatContext = createContext({
  addMessage: () => {},
  message: "",
  handleInputChange: () => {},
  isLoading: false,
});

interface Props {
  fileId: string;
  children: React.ReactNode;
}

export const ChatContextProvider = ({ fileId, children }: Props) => {
  const [message, setMessage] = useState<string>("");
  const { toast } = useToast();

  const {} = useMutation({
    mutationFn: async () => {},
  });
};
