import { supabase } from "../lib/supabase";

export type InquiryType = "contact" | "custom_project";

export type InquiryStatus =
  | "new"
  | "in_progress"
  | "completed"
  | "archived";

export interface Inquiry {
  id: string;
  type: InquiryType;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject?: string;
  product?: string;
  quantity?: string;
  deadline?: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInquiryData {
  type: InquiryType;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  subject?: string;
  product?: string;
  quantity?: string;
  deadline?: string;
  message: string;
}

interface InquiryRow {
  id: string;
  type: InquiryType;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  subject: string | null;
  product: string | null;
  quantity: string | null;
  deadline: string | null;
  message: string;
  status: InquiryStatus;
  created_at: string;
  updated_at: string;
}

function mapInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    type: row.type,
    name: row.name,
    company: row.company ?? undefined,
    email: row.email,
    phone: row.phone ?? undefined,
    subject: row.subject ?? undefined,
    product: row.product ?? undefined,
    quantity: row.quantity ?? undefined,
    deadline: row.deadline ?? undefined,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function createInquiry(
  data: CreateInquiryData
): Promise<void> {
  const { error } = await supabase
    .from("inquiries")
    .insert({
      type: data.type,
      name: data.name.trim(),
      company: data.company?.trim() || null,
      email: data.email.trim(),
      phone: data.phone?.trim() || null,
      subject: data.subject?.trim() || null,
      product: data.product?.trim() || null,
      quantity: data.quantity?.trim() || null,
      deadline: data.deadline?.trim() || null,
      message: data.message.trim(),
      status: "new",
    });

  if (error) {
    throw new Error(`Erro ao enviar solicitação: ${error.message}`);
  }
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  const { data, error } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Erro ao carregar solicitações: ${error.message}`);
  }

  return (data as InquiryRow[]).map(mapInquiry);
}

export async function updateInquiryStatus(
  inquiryId: string,
  status: InquiryStatus
): Promise<Inquiry> {
  const { data, error } = await supabase
    .from("inquiries")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", inquiryId)
    .select()
    .single();

  if (error) {
    throw new Error(`Erro ao atualizar solicitação: ${error.message}`);
  }

  return mapInquiry(data as InquiryRow);
}

export async function deleteInquiry(inquiryId: string): Promise<void> {
  const { error } = await supabase
    .from("inquiries")
    .delete()
    .eq("id", inquiryId);

  if (error) {
    throw new Error(`Erro ao excluir solicitação: ${error.message}`);
  }
}