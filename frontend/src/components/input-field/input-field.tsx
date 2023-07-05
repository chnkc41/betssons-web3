import { Component, Host, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'input-field',
  styleUrl: '../../tailwind.css',
  // styleUrl: 'input-field.css',
  shadow: true,
})
export class InputField {
  @Prop({ mutable: true }) id: string;
  @Prop({ mutable: true }) name: string;
  @Prop({ mutable: true }) type: string;
  @Prop({ mutable: true }) value: string;
  @Prop({ mutable: true }) placeholder: string;

  @Prop({ mutable: true }) required: boolean;
  @Prop({ mutable: true }) disabled: boolean;
  @Prop({ mutable: true }) readonly: boolean;
  @Prop({ mutable: true }) autoFocus: boolean;

  @Prop({ mutable: true }) className: string;
  @Prop({ mutable: true }) minLength: number;
  @Prop({ mutable: true }) maxLength: number;

  @Prop({ mutable: true }) label: string;
  @Prop({ mutable: true }) secondLabel: string;
  @Prop({ mutable: true }) onChange: any;
  @Prop({ mutable: true }) error: string;

  @State() errorClass: string = '';
  @State() defaultClass: string =
    'appearance-none block w-full px-3 py-2 h-11 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 !bg-transparent';

  componentDidLoad() {
    if (this.error && this.error.length > 0) {
      this.errorClass += 'border !border-red-600';
    }
  }

  noop = () => {};

  render() {
    return (
      <Host>
        <div>
          {this.label && (
            <label htmlFor={this.name || ''} class="label-primary">
              {this.label} {this.required && '*'}
            </label>
          )}
          <div class="relative mt-1.5 rounded-md shadow-sm">
            <input
              id={this.id || ''}
              type={this.type || 'text'}
              name={this.name || ''}
              placeholder={this.placeholder || ''}
              value={this.value || ''}
              class={`${this.defaultClass} ${this.errorClass} ${this.className || ''}`}
              minLength={this.minLength || +'3'}
              maxLength={this.maxLength || +'250'}
              autoFocus={this.autoFocus || false}
              required={this.required || false}
              disabled={this.disabled || false}
              readOnly={this.readonly || false}
              onChange={this.onChange || this.noop()}
              aria-invalid="true"
              aria-describedby="email-error"
            />

            {this.error && (
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span class="h-5 w-5 text-red-600" aria-hidden="true">
                  !
                </span>
              </div>
            )}
          </div>

          <p class={`label-secondary`}>
            {this.error && this.error.length > 0 ? <span class="text-red-600 block">{this.error}</span> : ''}

            {this.secondLabel}
          </p>
        </div>
      </Host>
    );
  }
}
