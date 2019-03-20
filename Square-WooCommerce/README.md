# Square and WooCommerce




## Setting up the development environment.

Of note, to uninstall woocommerce fully, you'll need to add `define( 'WC_REMOVE_ALL_DATA', true);` to your wp-config.
~ takes about ten minutes to vagrant up.  
```
cd ~/Development/vagrant-local && vagrant destroy && rm -rf ~/Development/vagrant-local && cd ~/Development && git clone -b master git://github.com/Varying-Vagrant-Vagrants/VVV.git ~/Development/vagrant-local && cd ~/Development/vagrant-local && time  vagrant up
```

`VBoxManage list vms`
`VBoxManage unregistervm vagrant-local_f2736a1dc39 --delete`
Using [VVV](https://varyingvagrantvagrants.org/docs/en-US/installation/)
```
git clone -b master git://github.com/Varying-Vagrant-Vagrants/VVV.git ~/Development/vagrant-local
```
Duplicate config file:
```
cp ~/Development/vagrant-local/vvv-config.yml ~/Development/vagrant-local/vvv-custom.yml
```
Start Vagrant:
```
cd ~/Development/vagrant-local
vagrant up
```
Now you should be able to see your vvv dashboard [vvv.test](http://vvv.test/) and log in to the [default site](http://local.wordpress.test/wp-login.php) with `admin`:`password`

To embed the admin page into an iframe, you'll need to add
```
remove_action( 'admin_init', 'send_frame_options_header' );
```

To your code, like `~/Development/vagrant-local/www/wordpress-default/public_html/wp-includes/default-filters.php`
Then you can search on the plugins page for WooCommerce and install. WooCommerce will put you through a configuration wizard.

Jetpack won't network
Install WooCommerce square
Connect Square account
Manually sync items (make sure you have good items in the first place)

enable square as a payment method


edit the payment_box
```
.sq-input {
    margin: 0 !important;
    font-size: 1.387em;
    background-color: #1dff41;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.125);
    box-sizing: border-box;
}
.payment_box.payment_method_square{
  background-color: rgb(209, 252, 196)
}
.payment_box.payment_method_square fieldset{
  background-color: rgb(209, 252, 196)
}
```
~/Development/vagrant-local/www/wordpress-default/public_html/wp-content/plugins/woocommerce-square/assets/css/wc-square-frontend-styles.css
