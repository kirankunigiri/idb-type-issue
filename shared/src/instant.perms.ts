// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from '@instantdb/react';

const rules = {
	/**
   * Welcome to Instant's permission system!
   * Right now your rules are empty. To start filling them in, check out the docs:
   * https://www.instantdb.com/docs/permissions
   *
   * Here's an example to give you a feel:
   * posts: {
   *   allow: {
   *     view: "true",
   *     create: "isOwner",
   *     update: "isOwner",
   *     delete: "isOwner",
   *   },
   *   bind: ["isOwner", "auth.id != null && auth.id == data.ownerId"],
   * },
   */

	// Set default permissions to false for security
	$default: {
		allow: {
			$default: 'false',
		},
	},

	$users: {
		allow: {
			view: 'isOwnUser || canViewViaKnownExpense', // Users can see their own data OR if they know an expense ID that belongs to the user
			create: 'false', // User creation handled by auth system
			update: 'false', // Users can only update their own data
			delete: 'false', // User deletion handled by auth system
		},
		bind: [
			'isOwnUser', 'auth.id != null && auth.id == data.id',
			'canViewViaKnownExpense', 'ruleParams.knownExpenseId != null && ruleParams.knownExpenseId in data.ref("expenses.id")',
		],
	},

	// Expenses: users can see their own, OR if someone knows the expense ID
	expenses: {
		allow: {
			view: 'isOwner || isKnownExpense',
			create: 'auth.id != null',
			update: 'isOwner',
			delete: 'isOwner',
		},
		bind: [
			'isOwner', 'auth.id != null && auth.id in data.ref("user.id")',
			'isKnownExpense', 'ruleParams.knownExpenseId != null && data.id == ruleParams.knownExpenseId',
		],
	},

	// Receipts: users can see their own, OR if it belongs to a known expense
	receipts: {
		allow: {
			view: 'isOwner || belongsToKnownExpense',
			create: 'isOwner',
			update: 'isOwner',
			delete: 'isOwner',
		},
		bind: [
			'isOwner', 'auth.id != null && auth.id in data.ref("expense.user.id")',
			'belongsToKnownExpense', 'ruleParams.knownExpenseId != null && ruleParams.knownExpenseId in data.ref("expense.id")',
		],
	},

	// Items: users can see their own, OR if it belongs to a receipt of a known expense
	items: {
		allow: {
			view: 'isOwner || belongsToKnownExpense',
			create: 'isOwner',
			update: 'isOwner',
			delete: 'isOwner',
		},
		bind: [
			'isOwner', 'auth.id != null && auth.id in data.ref("receipt.expense.user.id")',
			'belongsToKnownExpense', 'ruleParams.knownExpenseId != null && ruleParams.knownExpenseId in data.ref("receipt.expense.id")',
		],
	},

	// Contacts: can be viewed/modified by anyone who knows the expense ID
	contacts: {
		allow: {
			view: 'isExpenseOwner || belongsToKnownExpense',
			create: 'auth.id != null && (isExpenseOwner || belongsToKnownExpense)',
			update: 'isExpenseOwner || belongsToKnownExpense',
			delete: 'isExpenseOwner || belongsToKnownExpense',
		},
		bind: [
			'isExpenseOwner', 'auth.id != null && auth.id in data.ref("expenses.user.id")',
			'belongsToKnownExpense', 'ruleParams.knownExpenseId != null && (ruleParams.knownExpenseId in data.ref("expenses.id") || ruleParams.knownExpenseId in data.ref("items.receipt.expense.id"))',
		],
	},
} satisfies InstantRules;

export default rules;
