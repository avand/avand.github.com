desc "deploy site to avandamiri.com"
task :deploy do
  puts 'Regenerating site with jekyll'
  `jekyll`
  
  puts 'scp\'ing the files to avandamiri.com'
  `scp -r _site/* avand:~/html`
end