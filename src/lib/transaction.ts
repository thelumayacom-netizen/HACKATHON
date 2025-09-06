import { supabase } from '@/integrations/supabase/client';

// Match your database categories exactly
export const transactionCategories = [
  'Housing & Utilities',
  'Transportation',
  'Food & Groceries',
  'Shopping & Personal Care',
  'Health & Fitness',
  'Entertainment & Leisure',
  'Family & Education',
  'Finance & Others'
] as const;

export type TransactionCategory = typeof transactionCategories[number];

export interface Transaction {
  id?: string;
  desc: string; // For component compatibility
  amount: string | number;
  category: TransactionCategory;
  method: 'Voice' | 'Gmail' | 'Manual';
  icon: string;
  created_at?: string;
  updated_at?: string;
  user_id?: string;
  // DB field
  description?: string;
}

/**
 * NOTE: TypeScript errors (like "Argument of type 'transactions' is not assignable..."
 * or union error types such as SelectQueryError<...>) happen because your Supabase client
 * is typed against a generated Database type that doesn't include `transactions`.
 *
 * Quick/focused fix: cast supabase to `any` locally and cast query results to
 * `{ data: any; error: any }` (or `{ data: any[]; error: any }`) so TS won't try to infer
 * complex generic return types. This keeps runtime logic correct and removes TS compile errors.
 *
 * If you want real type-safety later, generate and use supabase types (recommended).
 */

const sb = supabase as any;

/**
 * Create a transaction (maps `desc` -> `description` for DB)
 */
export async function createTransaction(transaction: Transaction, userId: string) {
  const transactionData = {
    description: transaction.desc, // map component field to DB
    amount: typeof transaction.amount === 'string' ? parseFloat(transaction.amount) : transaction.amount,
    category: transaction.category,
    method: transaction.method,
    icon: transaction.icon,
    user_id: userId,
  };

  const resp = await (sb
    .from('transactions')
    .insert([transactionData])
    .select('id, user_id, description, amount, category, method, icon, created_at, updated_at')
    .single() as unknown as { data: any; error: any });

  const { data, error } = resp;

  if (error) {
    // Provide helpful error text when possible
    throw new Error(error.message ?? JSON.stringify(error));
  }

  if (!data) {
    throw new Error('No data returned from createTransaction');
  }

  const result: Transaction = {
    // ensure shape expected by components
    id: data.id,
    user_id: data.user_id,
    desc: data.description ?? transaction.desc,
    description: data.description,
    amount: data.amount,
    category: data.category,
    method: data.method,
    icon: data.icon,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return result;
}

/**
 * Get transactions for a user (maps `description` -> `desc`)
 */
export async function getTransactions(userId: string, limit = 50) {
  const resp = await (sb
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit) as unknown as { data: any[] | null; error: any });

  const { data, error } = resp;

  if (error) {
    throw new Error(error.message ?? JSON.stringify(error));
  }

  if (!data) {
    return [] as Transaction[];
  }

  const transactions: Transaction[] = data.map((item: any) => ({
    id: item.id,
    user_id: item.user_id,
    desc: item.description ?? item.desc ?? '',
    description: item.description,
    amount: item.amount,
    category: item.category,
    method: item.method,
    icon: item.icon,
    created_at: item.created_at,
    updated_at: item.updated_at,
  }));

  return transactions;
}

/**
 * Update a transaction (accepts component updates)
 */
export async function updateTransaction(id: string, updates: Partial<Transaction>) {
  // Map component `desc` to DB `description` and parse amount if needed
  const updateData: any = { ...updates };

  if (updates.desc !== undefined) {
    updateData.description = updates.desc;
    delete updateData.desc; // remove component-only field
  }

  if (updates.amount !== undefined) {
    updateData.amount = typeof updates.amount === 'string' ? parseFloat(updates.amount) : updates.amount;
  }

  const resp = await (sb
    .from('transactions')
    .update(updateData)
    .eq('id', id)
    .select('id, user_id, description, amount, category, method, icon, created_at, updated_at')
    .single() as unknown as { data: any; error: any });

  const { data, error } = resp;

  if (error) {
    throw new Error(error.message ?? JSON.stringify(error));
  }

  if (!data) {
    throw new Error('No data returned from updateTransaction');
  }

  const result: Transaction = {
    id: data.id,
    user_id: data.user_id,
    desc: data.description ?? '',
    description: data.description,
    amount: data.amount,
    category: data.category,
    method: data.method,
    icon: data.icon,
    created_at: data.created_at,
    updated_at: data.updated_at,
  };

  return result;
}

/**
 * Delete a transaction
 */
export async function deleteTransaction(id: string) {
  const resp = await (sb
    .from('transactions')
    .delete()
    .eq('id', id) as unknown as { data: any; error: any });

  const { error } = resp;

  if (error) {
    throw new Error(error.message ?? JSON.stringify(error));
  }

  return true;
}
