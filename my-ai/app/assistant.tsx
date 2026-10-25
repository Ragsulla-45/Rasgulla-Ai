"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime, AssistantChatTransport } from "@assistant-ui/ai-sdk";
import { lastAssistantMessageIsCompleteWithToolCalls } from "ai";
import { Thread } from "@/components/thread.aui";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThreadListSidebar } from "@/components/threadlist-sidebar.aui";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Sparkles } from "lucide-react";

export const Assistant = () => {
  const runtime = useChatRuntime({
    sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithToolCalls,
    transport: new AssistantChatTransport({
      api: "/api/chat",
    }),
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <div className="rasgulla-app-shell flex h-dvh w-full">
          <ThreadListSidebar />
          <SidebarInset className="rasgulla-main-pane min-w-0">
            <header className="rasgulla-topbar flex h-16 shrink-0 items-center justify-between px-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <SidebarTrigger className="rounded-full" aria-label="Toggle sidebar" />
                <Separator orientation="vertical" className="h-5 opacity-60" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="rasgulla-brand-title flex items-center gap-2 font-semibold">
                        <span className="rasgulla-brand-mark" aria-hidden="true">
                          <Sparkles className="size-4" />
                        </span>
                        <span>Rasgulla AI</span>
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden sm:block" />
                    <BreadcrumbItem className="hidden sm:block">
                      <span className="text-xs text-muted-foreground">Your everyday AI companion</span>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="rasgulla-topbar-status hidden items-center gap-2 sm:flex">
                <span className="rasgulla-status-dot" />
                <span>Ready to help</span>
              </div>
            </header>
            <div className="rasgulla-thread-stage min-h-0 flex-1 overflow-hidden">
              <Thread />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
};
