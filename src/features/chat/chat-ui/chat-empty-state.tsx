import Typography from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowUpCircle, Loader2 } from "lucide-react";
import { FC, useState } from "react";
import { ChatType, ConversationStyle, LLMModel } from "../chat-services/models";
import { ChatModelSelector } from "./chat-model-selector";
import { ChatStyleSelector } from "./chat-style-selector";
import { ChatTypeSelector } from "./chat-type-selector";


interface Prop {
  isUploadingFile: boolean;
  llmModel: LLMModel;
  chatType: ChatType;
  conversationStyle: ConversationStyle;
  onChatTypeChange: (value: ChatType) => void;
  onConversationStyleChange: (value: ConversationStyle) => void;
  onLLMModelChange: (value: LLMModel) => void;
  onFileChange: (file: FormData) => void;
}

export const EmptyState: FC<Prop> = (props) => {

  const [showFileUpload, setShowFileUpload] = useState<ChatType>("simple");
  const [isFileNull, setIsFileNull] = useState(true);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    props.onFileChange(formData);
  };

  const onChatTypeChange = (value: ChatType) => {
    setShowFileUpload(value);
    setIsFileNull(true);
    props.onChatTypeChange(value);
  };

 return (
    <div className="grid grid-cols-5 w-full items-center container mx-auto max-w-3xl justify-center h-full gap-9">
      <div className="col-span-2 gap-5 flex flex-col flex-1">
        <Typography variant="h4" className="text-primary">
        Dobrý den!
        </Typography>
        <p className="">
Dobrý den!
Začněte jednoduše tím, že napíšete svou zprávu do pole níže. Také můžete chat upravit podle svých představ změnou nastavení vpravo.
        </p>
        <p>
        <a href="https://raw.githubusercontent.com/cloud-sean/azurechatgpt/main/images/architecture.png" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'underline'}}>Klikněte sem</a> pro zobrazení diagramu architektury.
        </p>
        

        
      </div>
      <Card className="col-span-3 flex flex-col gap-5 p-5 ">
        <Typography variant="h4" className="text-primary">
          Personalise
        </Typography>
        <div className="flex flex-col gap-2">
          <p className="text-sm ">Select the Azure OpenAI model</p>
          <ChatModelSelector
            disable={false}
            llmModel={props.llmModel}
            onLLMModelChange={props.onLLMModelChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            Choose a conversation style
          </p>
          <ChatStyleSelector
            conversationStyle={props.conversationStyle}
            onChatStyleChange={props.onConversationStyleChange}
            disable={false}
          />
        </div> 
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">
            How would you like to chat?
          </p>
          <ChatTypeSelector
            chatType={props.chatType}
            onChatTypeChange={onChatTypeChange}
            disable={false}
          />
        </div>
        {showFileUpload === "data" && (
          <div className="flex flex-col gap-2">
            <form onSubmit={onSubmit} className="flex gap-2">
              <Input
                name="file"
                type="file"
                required
                disabled={props.isUploadingFile}
                placeholder="Describe the purpose of the document"
                onChange={(e) => {setIsFileNull(e.currentTarget.value === null)}}
              />
              <Button
                type="submit"
                value="Upload"
                disabled={!(!isFileNull && !props.isUploadingFile)}
                className="flex items-center gap-1"
              >
                {props.isUploadingFile ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <ArrowUpCircle size={20} />
                )}
                Upload
              </Button>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};
